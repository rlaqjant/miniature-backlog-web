import { Link } from 'react-router'
import { Button, Card } from '@/components/common'
import { useAuthStore } from '@/stores'

/**
 * 홈 페이지 (랜딩 페이지)
 */
export function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            SinTower - 죄악의 탑
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-indigo-100 md:text-xl">
            미니어처 도색 백로그를 체계적으로 관리하고,
            <br />
            당신의 작업 과정을 공유하세요.
          </p>
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  내 백로그 보기
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="secondary">
                    시작하기
                  </Button>
                </Link>
                <Link to="/board">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                    둘러보기
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            주요 기능
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* 기능 카드 1 */}
            <Card hoverable>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                  <ClipboardIcon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  백로그 관리
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  도색할 미니어처를 등록하고 단계별 진행 상황을 추적하세요.
                </p>
              </div>
            </Card>

            {/* 기능 카드 2 */}
            <Card hoverable>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                  <CameraIcon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  진행 로그
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  작업 과정을 사진과 함께 기록하고 나만의 히스토리를 만드세요.
                </p>
              </div>
            </Card>

            {/* 기능 카드 3 */}
            <Card hoverable>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                  <ShareIcon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  공유하기
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  완성작과 진행 과정을 공개 게시판에 공유하고 다른 사람들과 소통하세요.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      {!isAuthenticated && (
        <section className="bg-gray-100 py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              지금 바로 시작하세요
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              무료로 가입하고 당신의 미니어처 도색 여정을 기록하세요.
            </p>
            <Link to="/register">
              <Button size="lg">무료로 가입하기</Button>
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
