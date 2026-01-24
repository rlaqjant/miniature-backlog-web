import { Card } from '@/components/common'
import { ProgressBar } from '../ProgressBar'
import type { Miniature } from '@/types'

interface MiniatureCardProps {
  /** 미니어처 데이터 */
  miniature: Miniature
  /** 클릭 핸들러 */
  onClick?: (id: string) => void
}

/**
 * 진행 상태에 따른 배지 색상
 */
function getStatusBadge(progress: number) {
  if (progress === 0) {
    return {
      text: '시작 전',
      className: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    }
  }
  if (progress === 100) {
    return {
      text: '완료',
      className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    }
  }
  return {
    text: '진행 중',
    className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
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
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="p-4">
        {/* 헤더: 제목 + 상태 배지 */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 flex-1 font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge.className}`}
          >
            {statusBadge.text}
          </span>
        </div>

        {/* 진행률 바 */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">진행률</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} size="sm" />
        </div>

        {/* 푸터: 날짜 + 공개 여부 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatDate(updatedAt)}</span>
          {isPublic && (
            <span className="flex items-center gap-1">
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
