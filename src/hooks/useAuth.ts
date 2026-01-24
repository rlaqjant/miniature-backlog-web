import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores'
import { authApi } from '@/services/api'
import type { LoginRequest, RegisterRequest } from '@/types'

/**
 * 인증 관련 커스텀 훅
 * 로그인, 로그아웃, 회원가입 등 인증 로직을 캡슐화
 */
export function useAuth() {
  const navigate = useNavigate()
  const {
    user,
    isAuthenticated,
    isLoading,
    login: storeLogin,
    logout: storeLogout,
    setLoading,
  } = useAuthStore()

  /**
   * 로그인
   * 토큰은 httpOnly 쿠키로 서버에서 설정됨
   */
  const login = useCallback(async (data: LoginRequest, redirectTo?: string) => {
    setLoading(true)
    try {
      const response = await authApi.login(data)

      storeLogin(
        response.user || {
          id: 0,
          email: data.email,
          nickname: data.email.split('@')[0],
          createdAt: new Date().toISOString(),
        }
      )

      if (redirectTo) {
        navigate(redirectTo, { replace: true })
      }

      return { success: true }
    } catch {
      return {
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.',
      }
    } finally {
      setLoading(false)
    }
  }, [navigate, storeLogin, setLoading])

  /**
   * 로그아웃
   * 서버에 로그아웃 요청하여 쿠키 삭제
   */
  const logout = useCallback(async (redirectTo = '/') => {
    try {
      await authApi.logout()
    } catch {
      // 로그아웃 API 실패해도 클라이언트 상태는 초기화
    }
    storeLogout()
    navigate(redirectTo, { replace: true })
  }, [navigate, storeLogout])

  /**
   * 회원가입
   */
  const register = useCallback(async (data: RegisterRequest) => {
    setLoading(true)
    try {
      await authApi.register(data)
      return { success: true }
    } catch {
      return {
        success: false,
        error: '회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.',
      }
    } finally {
      setLoading(false)
    }
  }, [setLoading])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  }
}
