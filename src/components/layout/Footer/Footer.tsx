/**
 * 애플리케이션 푸터 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-cream-200 bg-forest-600 dark:bg-forest-900">
      <div className="container mx-auto px-6 py-12">
        {/* 상단 영역 */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* 로고 & 설명 */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-cream-50 mb-2">
              SinTower
            </h3>
            <p className="text-sm text-forest-200">
              미니어처 도색 백로그 추적 서비스
            </p>
          </div>

          {/* 링크 */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-sm text-forest-200 hover:text-cream-50 transition-colors"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-sm text-forest-200 hover:text-cream-50 transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-sm text-forest-200 hover:text-cream-50 transition-colors"
            >
              문의하기
            </a>
          </nav>
        </div>

        {/* 하단 영역 - 저작권 */}
        <div className="border-t border-forest-500 pt-6">
          <p className="text-center text-xs text-forest-300">
            &copy; {currentYear} SinTower - 죄악의 탑. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
