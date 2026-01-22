import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layout'
import { HomePage } from '@/pages/Home'
import { NotFoundPage } from '@/pages/NotFound'

/**
 * 애플리케이션 라우터 정의
 * React Router v7 사용
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
