import { Link } from 'react-router'
import { Button, Card } from '@/components/common'
import { useAuthStore } from '@/stores'
import mainImage from '@/assets/images/main.jpeg'
/**
 * 홈 페이지 (랜딩 페이지)
 * 자연주의 프리미엄 디자인 시스템
 */
export function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-forest-600 via-forest-500 to-forest-600 overflow-hidden">
        {/* 장식 요소 - 골드 라인 */}
        <div className="absolute top-20 left-1/3 w-64 h-64 opacity-20">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path
              d="M100 20 C140 40, 160 80, 140 120 C120 160, 80 180, 60 140 C40 100, 60 60, 100 20"
              stroke="#c9a962"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M80 30 C110 50, 130 90, 110 130 C90 170, 50 180, 40 140"
              stroke="#c9a962"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 영역 */}
            <div className="text-left">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-50 mb-8 leading-tight">
                Paint your
                <br />
                <span className="text-gold-400">imagination.</span>
              </h1>

              <p className="text-lg md:text-xl text-forest-200 mb-10 max-w-lg leading-relaxed">
                미니어처 도색의 모든 여정을 기록하세요.
                <br />
                체계적인 백로그 관리와 함께
                <br />
                당신만의 작품 갤러리를 만들어보세요.
              </p>

              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" variant="accent" className="group">
                      내 백로그 보기
                      <ArrowIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" variant="accent" className="group">
                        시작하기
                        <ArrowIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/board">
                      <Button
                        size="lg"
                        variant="primary"
                        className="text-cream-100 border-cream-100/30 hover:bg-cream-50/10"
                      >
                        둘러보기
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* 오른쪽: 비주얼 카드 영역 */}
            <div className="relative hidden lg:block">
              {/* 장식 카드 1 - 상단 우측 */}
              <div className="absolute -top-8 right-0 w-64 h-72 bg-cream-50 rounded-2xl shadow-soft-lg transform rotate-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-forest-100 flex items-center justify-center">
                      <PaintBrushIcon className="w-10 h-10 text-forest-500" />
                    </div>
                    <p className="font-display text-lg text-charcoal-500">도색 진행률</p>
                    <p className="text-3xl font-bold text-forest-500 mt-2">78%</p>
                  </div>
                </div>
              </div>

              {/* 장식 카드 2 - 중앙 (실제 미니어처 이미지) */}
              <div className="absolute top-24 right-32 w-72 h-80 bg-cream-50 rounded-2xl shadow-soft-lg transform -rotate-2 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cream-50 to-cream-100 p-6">
                  <div className="w-full h-3/5 rounded-xl overflow-hidden mb-4">
                    <img
                      src={mainImage}
                      alt="Memnyr Strategist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-display text-lg text-charcoal-900">Memnyr Strategist</p>
                  <p className="text-sm text-stone-500 mt-1">완료 • 5단계</p>
                  <div className="mt-3 h-2 bg-cream-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-forest-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* 장식 카드 3 - 하단 좌측 */}
              <div className="absolute top-64 left-0 w-56 h-64 bg-cream-50 rounded-2xl shadow-soft-lg transform rotate-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cream-100 to-cream-50 p-5">
                  <div className="w-full h-3/5 rounded-xl bg-gradient-to-br from-gold-100 to-gold-200 mb-3 flex items-center justify-center">
                    <TrophyIcon className="w-16 h-16 text-gold-500" />
                  </div>
                  <p className="font-display text-base text-charcoal-900">완성작</p>
                  <p className="text-2xl font-bold text-forest-500 mt-1">12개</p>
                </div>
              </div>

              {/* 골드 장식 라인 */}
              <svg className="absolute top-40 right-200 w-32 h-32 opacity-60" viewBox="0 0 100 100" fill="none">
                <path
                  d="M10 50 Q30 20, 50 50 T90 50"
                  stroke="#c9a962"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 70 Q40 40, 60 70 T100 70"
                  stroke="#c9a962"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 하단 곡선 장식 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#faf8f5"
              className="dark:fill-[#1a1814]"
            />
          </svg>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-24 bg-cream-50 dark:bg-[#1a1814]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-charcoal-900 dark:text-cream-50 mb-4">
              주요 기능
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              미니어처 도색의 모든 과정을 체계적으로 관리하세요
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* 기능 카드 1 */}
            <Card hoverable className="text-center">
              <div className="p-8">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-forest-100 text-forest-500 dark:bg-forest-900/30 dark:text-forest-400">
                  <ClipboardIcon className="h-10 w-10" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-charcoal-900 dark:text-cream-50">
                  백로그 관리
                </h3>
                <p className="text-stone-500">
                  도색할 미니어처를 등록하고 단계별 진행 상황을 추적하세요.
                </p>
              </div>
            </Card>

            {/* 기능 카드 2 */}
            <Card hoverable className="text-center">
              <div className="p-8">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gold-100 text-gold-600 dark:bg-gold-900/30 dark:text-gold-400">
                  <CameraIcon className="h-10 w-10" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-charcoal-900 dark:text-cream-50">
                  진행 로그
                </h3>
                <p className="text-stone-500">
                  작업 과정을 사진과 함께 기록하고 나만의 히스토리를 만드세요.
                </p>
              </div>
            </Card>

            {/* 기능 카드 3 */}
            <Card hoverable className="text-center">
              <div className="p-8">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-terracotta-500/10 text-terracotta-500 dark:bg-terracotta-500/20">
                  <ShareIcon className="h-10 w-10" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-charcoal-900 dark:text-cream-50">
                  공유하기
                </h3>
                <p className="text-stone-500">
                  완성작과 진행 과정을 공개 게시판에 공유하고 다른 사람들과 소통하세요.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 bg-cream-100 dark:bg-[#252219]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-4xl md:text-5xl font-bold text-forest-500">89%</p>
              <p className="mt-2 text-stone-500">완성률 향상</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-bold text-gold-500">1,200+</p>
              <p className="mt-2 text-stone-500">등록된 작품</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-bold text-terracotta-500">500+</p>
              <p className="mt-2 text-stone-500">활성 사용자</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl font-bold text-forest-400">78%</p>
              <p className="mt-2 text-stone-500">평균 진행률</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      {!isAuthenticated && (
        <section className="py-24 bg-cream-50 dark:bg-[#1a1814]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal-900 dark:text-cream-50 mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="mb-10 text-stone-500 max-w-xl mx-auto">
              무료로 가입하고 당신의 미니어처 도색 여정을 기록하세요.
              <br />
              체계적인 관리로 더 많은 작품을 완성할 수 있습니다.
            </p>
            <Link to="/register">
              <Button size="lg" className="group">
                무료로 가입하기
                <ArrowIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

// 아이콘 컴포넌트들
function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  )
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function PaintBrushIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  )
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
