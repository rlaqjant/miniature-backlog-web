import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/stores'

interface GuestRouteProps {
  /** 리다이렉트할 경로 (기본: /dashboard) */
  redirectTo?: string
}

/**
 * 비로그인 사용자만 접근할 수 있는 라우트
 * 로그인 사용자는 대시보드로 리다이렉트
 */
export function GuestRoute({ redirectTo = '/dashboard' }: GuestRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
