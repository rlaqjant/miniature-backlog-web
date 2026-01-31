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
function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '-'
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
  const { id, title, progress, updatedAt, userNickname, likeCount, liked } = miniature
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

        {/* 푸터: 작성자 + 좋아요 + 날짜 */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="font-medium text-charcoal-500 dark:text-cream-300">
            {userNickname}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <HeartIcon filled={liked} className="h-3.5 w-3.5" />
              {likeCount > 0 && likeCount}
            </span>
            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * 하트 아이콘 컴포넌트
 */
function HeartIcon({ filled, className }: { filled: boolean; className?: string }) {
  if (filled) {
    return (
      <svg className={`${className} text-rose-500`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    )
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}
