import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layout'
import { HomePage, NotFoundPage, LoginPage, RegisterPage, DashboardPage, MiniatureDetailPage } from '@/pages'
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
            element: <DashboardPage />,
          },
          {
            path: 'miniatures/:id',
            element: <MiniatureDetailPage />,
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
