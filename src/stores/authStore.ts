import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthTokens } from '@/types'

interface AuthState {
  /** 현재 로그인한 사용자 정보 */
  user: User | null
  /** 액세스 토큰 */
  accessToken: string | null
  /** 인증 여부 */
  isAuthenticated: boolean
  /** 로딩 상태 */
  isLoading: boolean
}

interface AuthActions {
  /** 로그인 처리 */
  login: (user: User, tokens: AuthTokens) => void
  /** 로그아웃 처리 */
  logout: () => void
  /** 토큰 갱신 */
  setAccessToken: (token: string) => void
  /** 로딩 상태 설정 */
  setLoading: (loading: boolean) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
}

/**
 * 인증 상태 관리 스토어
 * localStorage에 토큰 정보 영속화
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: (user, tokens) => {
        set({
          user,
          accessToken: tokens.accessToken,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set(initialState)
      },

      setAccessToken: (token) => {
        set({ accessToken: token })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // 민감한 정보는 제외하고 영속화
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
