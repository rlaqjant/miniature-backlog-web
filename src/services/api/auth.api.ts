import { apiClient } from './client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types'

/**
 * 인증 관련 API
 */
export const authApi = {
  /**
   * 로그인
   * 성공 시 토큰은 httpOnly 쿠키로 설정됨
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
   * 쿠키의 refreshToken으로 새 accessToken 발급 (쿠키로 설정됨)
   */
  refresh: async (): Promise<void> => {
    await apiClient.post('/auth/refresh')
  },

  /**
   * 로그아웃
   * 서버에서 쿠키 삭제
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },
}
