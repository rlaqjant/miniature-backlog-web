import { Spinner, Button } from '@/components/common'
import { MiniatureCard } from '../MiniatureCard'
import { EmptyState } from '../EmptyState'
import type { Miniature } from '@/types'

interface MiniatureListProps {
  /** 미니어처 목록 */
  miniatures: Miniature[]
  /** 로딩 상태 */
  isLoading: boolean
  /** 에러 메시지 */
  error: string | null
  /** 카드 클릭 핸들러 */
  onCardClick?: (id: number) => void
  /** 빈 상태 액션 핸들러 */
  onEmptyAction?: () => void
  /** 재시도 핸들러 */
  onRetry?: () => void
}

/**
 * 미니어처 목록 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 * - 로딩/에러/빈 상태/목록 조건부 렌더링
 */
export function MiniatureList({
  miniatures,
  isLoading,
  error,
  onCardClick,
  onEmptyAction,
  onRetry,
}: MiniatureListProps) {
  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" label="백로그를 불러오는 중..." />
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#c75f5f]/10 px-8 py-16 dark:bg-[#c75f5f]/5">
        <svg
          className="mb-4 h-12 w-12 text-[#c75f5f]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="font-display mb-2 text-lg font-semibold text-[#c75f5f]">
          오류가 발생했습니다
        </h3>
        <p className="mb-6 text-center text-[#c75f5f]/80">{error}</p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            다시 시도
          </Button>
        )}
      </div>
    )
  }

  // 빈 상태
  if (miniatures.length === 0) {
    return <EmptyState onAction={onEmptyAction} />
  }

  // 목록 렌더링
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {miniatures.map((miniature) => (
        <MiniatureCard
          key={miniature.id}
          miniature={miniature}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}
