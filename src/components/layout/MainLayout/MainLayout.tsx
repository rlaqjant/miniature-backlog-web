import { Outlet } from 'react-router'
import { Header } from '../Header'
import { Footer } from '../Footer'

/**
 * 메인 레이아웃 컴포넌트
 * 헤더, 메인 콘텐츠, 푸터로 구성
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
