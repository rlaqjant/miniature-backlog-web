/**
 * 애플리케이션 푸터 컴포넌트
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* 저작권 */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} SinTower - 죄악의 탑. All rights reserved.
          </p>

          {/* 링크 */}
          <nav className="flex gap-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              문의하기
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
