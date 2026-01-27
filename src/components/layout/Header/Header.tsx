import { Link } from 'react-router'
import { useAuthStore } from '@/stores'
import { useUIStore } from '@/stores'
import { Button } from '@/components/common'

/**
 * 애플리케이션 헤더 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { toggleSidebar } = useUIStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80 dark:border-charcoal-500 dark:bg-[#1a1814]/95">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
        {/* 로고 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden text-charcoal-500 hover:text-forest-500 transition-colors"
            onClick={toggleSidebar}
            aria-label="메뉴 열기"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="font-display text-2xl font-bold text-forest-600 dark:text-forest-400">
              PaintLater
            </span>
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-8">
          {isAuthenticated && (
            <>
              <Link
                to="/board"
                className="text-charcoal-500 hover:text-forest-500 transition-colors font-medium dark:text-cream-200 dark:hover:text-forest-400"
              >
                공개 게시판
              </Link>
              <Link
                to="/dashboard"
                className="text-charcoal-500 hover:text-forest-500 transition-colors font-medium dark:text-cream-200 dark:hover:text-forest-400"
              >
                내 백로그
              </Link>
            </>
          )}
        </nav>

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-charcoal-500 dark:text-cream-200">
                {user?.nickname}님
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">로그인</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">회원가입</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// 메뉴 아이콘 컴포넌트
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}
