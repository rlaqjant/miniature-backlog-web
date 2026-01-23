import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '@/stores'
import { authApi } from '@/services/api'
import { Spinner } from '@/components/common'

interface AuthInitializerProps {
  children: ReactNode
}

/**
 * 인증 초기화 컴포넌트
 * 앱 시작 시 저장된 토큰을 검증하고 필요시 갱신
 * (API 명세 3.4 가이드 이행)
 */
export function AuthInitializer({ children }: AuthInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const initAuth = async () => {
      // 저장된 토큰이 있는 경우 검증
      if (accessToken) {
        try {
          // 토큰 갱신으로 유효성 검증
          const response = await authApi.refresh()
          setAccessToken(response.accessToken)
        } catch {
          // 갱신 실패 시 로그아웃
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
