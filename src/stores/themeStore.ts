import { create } from 'zustand'

const STORAGE_KEY = 'theme-dark'

interface ThemeState {
  /** 다크모드 여부 */
  isDark: boolean
  /** 라이트/다크 토글 */
  toggleTheme: () => void
}

/**
 * 테마(다크모드) 상태 관리
 * - localStorage 영속화
 * - 초기값: localStorage → OS prefers-color-scheme
 */
export const useThemeStore = create<ThemeState>()((set) => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const initialDark =
    stored !== null
      ? stored === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches

  return {
    isDark: initialDark,
    toggleTheme: () =>
      set((state) => {
        const next = !state.isDark
        localStorage.setItem(STORAGE_KEY, String(next))
        if (next) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { isDark: next }
      }),
  }
})

// 초기 적용 (스토어 생성 시 즉시 실행)
const applyInitialTheme = () => {
  const { isDark } = useThemeStore.getState()
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
applyInitialTheme()
