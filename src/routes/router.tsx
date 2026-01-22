import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layout'
import { HomePage, NotFoundPage, LoginPage, RegisterPage } from '@/pages'
import { ProtectedRoute } from './ProtectedRoute'
import { GuestRoute } from './GuestRoute'

/**
 * 애플리케이션 라우터 정의
 * React Router v7 사용
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // 공개 라우트
      {
        index: true,
        element: <HomePage />,
      },

      // 비로그인 사용자 전용 라우트
      {
        element: <GuestRoute />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },

      // 인증 필요 라우트
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <div className="p-8 text-center text-gray-500">대시보드 페이지 (Phase 4에서 구현 예정)</div>,
          },
        ],
      },

      // 404
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
