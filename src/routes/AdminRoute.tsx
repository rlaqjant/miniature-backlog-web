import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/stores'

/**
 * 관리자 전용 라우트 가드
 * 미인증 사용자 → /login, 일반 사용자 → /dashboard
 */
export function AdminRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
