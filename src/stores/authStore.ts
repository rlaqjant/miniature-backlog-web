import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  /** 현재 로그인한 사용자 정보 */
  user: User | null
  /** 인증 여부 */
  isAuthenticated: boolean
  /** 로딩 상태 */
  isLoading: boolean
}

interface AuthActions {
  /** 로그인 처리 */
  login: (user: User) => void
  /** 로그아웃 처리 */
  logout: () => void
  /** 로딩 상태 설정 */
  setLoading: (loading: boolean) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

/**
 * 인증 상태 관리 스토어
 * 토큰은 httpOnly 쿠키에서 관리되며, 사용자 정보만 localStorage에 영속화
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set(initialState)
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // user 정보만 영속화 (토큰은 httpOnly 쿠키로 관리)
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)
