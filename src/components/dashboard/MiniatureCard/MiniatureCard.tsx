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
 * 미니어처 카드 컴포넌트
 * 이미지 포함 카드 디자인
 */
export function MiniatureCard({ miniature, onClick }: MiniatureCardProps) {
  const { id, title, progress, updatedAt, isPublic, thumbnailUrl } = miniature
  const statusBadge = getStatusBadge(progress)

  const handleClick = () => {
    if (onClick) {
      onClick(id)
    }
  }

  return (
    <Card
      className="cursor-pointer group"
      padding="none"
      hoverable
      onClick={handleClick}
    >
      {/* 이미지 영역 */}
      {thumbnailUrl ? (
        <div className="h-48 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center bg-cream-200 dark:bg-charcoal-600">
          <svg
            className="h-12 w-12 text-cream-400 dark:text-charcoal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm14.25-14.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      )}

      {/* 본문 */}
      <div className="flex flex-col gap-3 p-5">
        {/* 제목 */}
        <h3 className="font-display line-clamp-1 text-[15px] font-semibold text-charcoal-900 group-hover:text-forest-500 transition-colors dark:text-cream-50">
          {title}
        </h3>

        {/* 메타: 공개여부 아이콘 (좌) / 날짜 (우) */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          {isPublic ? (
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
          ) : (
            <span className="flex items-center gap-1 text-stone-400 dark:text-charcoal-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              비공개
            </span>
          )}
          <span>{formatDate(updatedAt)}</span>
        </div>

        {/* 상태 태그 배지 */}
        <div>
          <span
            className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${statusBadge.className}`}
          >
            {statusBadge.text}
          </span>
        </div>

        {/* 진행률 바 (진행 중인 경우만) */}
        {progress > 0 && progress < 100 && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-stone-500">진행률</span>
              <span className="font-semibold text-charcoal-500 dark:text-cream-200">
                {progress}%
              </span>
            </div>
            <ProgressBar value={progress} size="sm" />
          </div>
        )}
      </div>
    </Card>
  )
}
