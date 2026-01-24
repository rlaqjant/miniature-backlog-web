import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { env } from '@/utils'
import { useAuthStore } from '@/stores'
import type { ApiResponse } from '@/types'

// 에러 코드 상수
const ERROR_CODES = {
  INVALID_TOKEN: 'E2002',
  EXPIRED_TOKEN: 'E2003',
} as const

/**
 * Axios 인스턴스 생성
 * 기본 URL 및 공통 설정 적용
 * withCredentials: httpOnly 쿠키 자동 전송/수신
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 토큰 갱신 중인지 추적
let isRefreshing = false
// 토큰 갱신 대기 중인 요청들
let failedQueue: Array<{
  resolve: () => void
  reject: (error: Error) => void
}> = []

/**
 * 대기 중인 요청들 처리
 */
const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve()
    }
  })
  failedQueue = []
}

/**
 * 응답 인터셉터
 * - ApiResponse 래퍼에서 data 추출
 * - 401 에러 시 토큰 갱신 시도 (E2003 만료된 토큰만)
 * - 갱신 실패 시 로그아웃 처리
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    // ApiResponse 래퍼에서 data 추출
    // 참고: 로그인/로그아웃 등 일부 API는 data 필드가 없음 (success, message만 반환)
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      // data 필드가 있으면 추출, 없으면 빈 객체 반환
      response.data = (response.data.data ?? {}) as typeof response.data
    }
    return response
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 에러 응답에서 에러 코드 추출
    const errorCode = error.response?.data?.error?.code

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 유효하지 않은 토큰(E2002)인 경우 바로 로그아웃
      if (errorCode === ERROR_CODES.INVALID_TOKEN) {
        useAuthStore.getState().logout()
        return Promise.reject(error)
      }

      // 만료된 토큰(E2003)인 경우 갱신 시도
      // 이미 갱신 중인 경우 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(undefined), reject })
        })
          .then(() => {
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 토큰 갱신 요청 (쿠키 자동 전송/수신)
        await apiClient.post('/auth/refresh')

        // 대기 중인 요청들 처리
        processQueue(null)

        // 원래 요청 재시도
        return apiClient(originalRequest)
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃
        processQueue(refreshError as Error)
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
