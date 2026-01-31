import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layout'
import { HomePage, NotFoundPage, LoginPage, RegisterPage, DashboardPage, MiniatureDetailPage, PublicBoardPage, PublicMiniatureDetailPage, AdminPage } from '@/pages'
import { ProtectedRoute } from './ProtectedRoute'
import { GuestRoute } from './GuestRoute'
import { AdminRoute } from './AdminRoute'

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
      {
        path: 'board',
        element: <PublicBoardPage />,
      },
      {
        path: 'board/:miniatureId',
        element: <PublicMiniatureDetailPage />,
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

      // 관리자 전용 라우트
      {
        element: <AdminRoute />,
        children: [
          {
            path: 'admin',
            element: <AdminPage />,
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
