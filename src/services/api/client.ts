import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { env } from '@/utils'
import { useAuthStore } from '@/stores'

/**
 * Axios 인스턴스 생성
 * 기본 URL 및 공통 설정 적용
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 토큰 갱신 중인지 추적
let isRefreshing = false
// 토큰 갱신 대기 중인 요청들
let failedQueue: Array<{
  resolve: (token: string | null) => void
  reject: (error: Error) => void
}> = []

/**
 * 대기 중인 요청들 처리
 */
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

/**
 * 요청 인터셉터
 * - JWT 토큰 자동 첨부
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

/**
 * 응답 인터셉터
 * - 401 에러 시 토큰 갱신 시도
 * - 갱신 실패 시 로그아웃 처리
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 갱신 중인 경우 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 토큰 갱신 요청
        const response = await apiClient.post('/auth/refresh')
        const { accessToken } = response.data

        // 새 토큰 저장
        useAuthStore.getState().setAccessToken(accessToken)

        // 대기 중인 요청들 처리
        processQueue(null, accessToken)

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return apiClient(originalRequest)
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃
        processQueue(refreshError as Error, null)
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
