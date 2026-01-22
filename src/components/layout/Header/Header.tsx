import { Link } from 'react-router'
import { useAuthStore } from '@/stores'
import { useUIStore } from '@/stores'
import { Button } from '@/components/common'

/**
 * 애플리케이션 헤더 컴포넌트
 */
export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { toggleSidebar } = useUIStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden"
            onClick={toggleSidebar}
            aria-label="메뉴 열기"
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
          >
            <span>SinTower</span>
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/board"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            공개 게시판
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              내 백로그
            </Link>
          )}
        </nav>

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.nickname}님
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">로그인</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">회원가입</Button>
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
