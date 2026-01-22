import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/stores'

interface ProtectedRouteProps {
  /** 리다이렉트할 경로 (기본: /login) */
  redirectTo?: string
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * 비로그인 사용자는 로그인 페이지로 리다이렉트
 */
export function ProtectedRoute({ redirectTo = '/login' }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 돌아갈 수 있도록 현재 위치 저장
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <Outlet />
}
