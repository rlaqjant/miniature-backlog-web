import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
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
 * - 401 에러 시 로그아웃 처리
 * - 공통 에러 핸들링
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      // 인증 실패 시 로그아웃 처리
      useAuthStore.getState().logout()
      // 로그인 페이지로 리다이렉트는 라우터 레벨에서 처리
    }

    return Promise.reject(error)
  }
)
