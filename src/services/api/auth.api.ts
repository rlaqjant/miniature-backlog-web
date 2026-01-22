import { apiClient } from './client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types'

/**
 * 인증 관련 API
 */
export const authApi = {
  /**
   * 로그인
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  /**
   * 회원가입
   */
  register: async (data: RegisterRequest): Promise<void> => {
    await apiClient.post('/auth/register', data)
  },

  /**
   * 토큰 갱신
   */
  refresh: async (): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh')
    return response.data
  },
}
