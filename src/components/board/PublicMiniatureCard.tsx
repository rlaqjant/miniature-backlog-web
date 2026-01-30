import { Card } from '@/components/common'
import { ProgressBar } from '@/components/dashboard/ProgressBar'
import type { PublicMiniature } from '@/types'

interface PublicMiniatureCardProps {
  /** 공개 미니어처 데이터 */
  miniature: PublicMiniature
  /** 클릭 핸들러 */
  onClick: (id: number) => void
}

/**
 * 진행 상태에 따른 배지 스타일
 */
function getStatusBadge(progress: number) {
  if (progress === 0) {
    return {
      text: '시작 전',
      className: 'bg-cream-200 text-charcoal-500 dark:bg-charcoal-500 dark:text-cream-200',
    }
  }
  if (progress === 100) {
    return {
      text: '완료',
      className: 'bg-forest-100 text-forest-600 dark:bg-forest-900/30 dark:text-forest-300',
    }
  }
  return {
    text: '진행 중',
    className: 'bg-gold-500/20 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400',
  }
}

/**
 * 날짜 포맷팅
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * 공개 미니어처 카드 컴포넌트
 * 제목, 상태 배지, 진행률 바, 작성자 닉네임, 날짜 표시
 */
export function PublicMiniatureCard({ miniature, onClick }: PublicMiniatureCardProps) {
  const { id, title, progress, updatedAt, userNickname } = miniature
  const statusBadge = getStatusBadge(progress)

  return (
    <Card
      className="cursor-pointer group"
      hoverable
      onClick={() => onClick(id)}
    >
      <div className="p-5">
        {/* 헤더: 제목 + 상태 배지 */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="font-display line-clamp-2 flex-1 text-lg font-semibold text-charcoal-900 group-hover:text-forest-500 transition-colors dark:text-cream-50">
            {title}
          </h3>
          <span
            className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${statusBadge.className}`}
          >
            {statusBadge.text}
          </span>
        </div>

        {/* 진행률 바 */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-stone-500">진행률</span>
            <span className="font-semibold text-charcoal-500 dark:text-cream-200">
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} size="sm" />
        </div>

        {/* 푸터: 작성자 + 날짜 */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-medium text-charcoal-500 dark:text-cream-300">
            {userNickname}
          </span>
          <span>{formatDate(updatedAt)}</span>
        </div>
      </div>
    </Card>
  )
}
