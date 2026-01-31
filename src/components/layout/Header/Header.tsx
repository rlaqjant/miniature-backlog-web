import { Link, useLocation } from 'react-router'
import { useEffect } from 'react'
import { useAuthStore, useUIStore, useThemeStore } from '@/stores'
import { Button } from '@/components/common'

/**
 * 애플리케이션 헤더 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore()
  const { isDark, toggleTheme } = useThemeStore()
  const location = useLocation()

  // 페이지 이동 시 모바일 메뉴 닫기
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname, setSidebarOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-cream-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80 dark:border-charcoal-600 dark:bg-[#1a1814]/95">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
          {/* 로고 */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden text-charcoal-500 hover:text-forest-500 transition-colors"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {isSidebarOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
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

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/board"
              className="text-charcoal-500 hover:text-forest-500 transition-colors font-medium dark:text-cream-200 dark:hover:text-forest-400"
            >
              공개 게시판
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-charcoal-500 hover:text-forest-500 transition-colors font-medium dark:text-cream-200 dark:hover:text-forest-400"
              >
                내 백로그
              </Link>
            )}
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center gap-4">
            {/* 테마 토글 버튼 */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-charcoal-500 transition-colors hover:bg-cream-200 dark:text-cream-200 dark:hover:bg-charcoal-600"
              aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <span className="hidden sm:inline text-sm font-medium text-charcoal-500 dark:text-cream-200">
                  {user?.nickname}님
                </span>
                <span className="hidden sm:inline">
                  <Button variant="outline" size="sm" onClick={logout}>
                    로그아웃
                  </Button>
                </span>
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

      {/* 모바일 메뉴 */}
      {isSidebarOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-charcoal-900/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* 메뉴 패널 */}
          <nav className="fixed top-[72px] left-0 right-0 z-50 border-b border-cream-200 bg-cream-50 px-6 py-4 lg:hidden dark:border-charcoal-600 dark:bg-[#1a1814]">
            <div className="flex flex-col gap-2">
              {isAuthenticated && (
                /* 사용자 정보 (sm 미만에서만 표시) */
                <div className="sm:hidden flex items-center justify-between rounded-lg px-4 py-3 mb-1 border-b border-cream-200 dark:border-charcoal-600">
                  <span className="text-sm font-medium text-charcoal-500 dark:text-cream-200">
                    {user?.nickname}님
                  </span>
                  <Button variant="outline" size="sm" onClick={logout}>
                    로그아웃
                  </Button>
                </div>
              )}
              <Link
                to="/board"
                className="rounded-lg px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-200 transition-colors dark:text-cream-200 dark:hover:bg-charcoal-600"
              >
                공개 게시판
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="rounded-lg px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-200 transition-colors dark:text-cream-200 dark:hover:bg-charcoal-600"
                >
                  내 백로그
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-4 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-200 transition-colors dark:text-cream-200 dark:hover:bg-charcoal-600"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg px-4 py-3 text-base font-medium text-forest-600 hover:bg-cream-200 transition-colors dark:text-forest-400 dark:hover:bg-charcoal-600"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </>
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

// 해(sun) 아이콘 - 다크모드에서 표시
function SunIcon({ className }: { className?: string }) {
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
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

// 달(moon) 아이콘 - 라이트모드에서 표시
function MoonIcon({ className }: { className?: string }) {
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
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

// 닫기 아이콘 컴포넌트
function CloseIcon({ className }: { className?: string }) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
