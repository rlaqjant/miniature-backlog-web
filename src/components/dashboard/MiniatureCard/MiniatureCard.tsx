import { Card } from '@/components/common'
import { ProgressBar } from '../ProgressBar'
import type { Miniature } from '@/types'

interface MiniatureCardProps {
  /** 미니어처 데이터 */
  miniature: Miniature
  /** 클릭 핸들러 */
  onClick?: (id: number) => void
}

/**
 * 진행 상태에 따른 배지 스타일 (자연주의 팔레트)
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
 * 미니어처 카드 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function MiniatureCard({ miniature, onClick }: MiniatureCardProps) {
  const { id, title, progress, updatedAt, isPublic } = miniature
  const statusBadge = getStatusBadge(progress)

  const handleClick = () => {
    if (onClick) {
      onClick(id)
    }
  }

  return (
    <Card
      className="cursor-pointer group"
      hoverable
      onClick={handleClick}
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

        {/* 푸터: 날짜 + 공개 여부 */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>{formatDate(updatedAt)}</span>
          {isPublic && (
            <span className="flex items-center gap-1 text-forest-500">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              공개
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
