import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '@/stores'
import { authApi } from '@/services/api'
import { Spinner } from '@/components/common'

interface AuthInitializerProps {
  children: ReactNode
}

/**
 * 인증 초기화 컴포넌트
 * 앱 시작 시 쿠키의 토큰을 검증하고 인증 상태 동기화
 * (API 명세 3.4 가이드 이행)
 */
export function AuthInitializer({ children }: AuthInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const initAuth = async () => {
      // localStorage에 인증 상태가 있는 경우 쿠키 유효성 검증
      if (isAuthenticated) {
        try {
          // 토큰 갱신으로 쿠키 유효성 검증
          await authApi.refresh()
          // 성공 시 인증 상태 유지 (user 정보는 localStorage에서 복원됨)
        } catch {
          // 쿠키 없거나 만료 → 로그아웃
          logout()
        }
      }
      setIsInitialized(true)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 마운트 시 한 번만 실행 (의존성 배열 의도적 비움)

  // 초기화 완료 전 로딩 표시
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
