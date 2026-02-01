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
 * 공개 미니어처 카드 컴포넌트
 * 이미지 포함 카드 디자인
 */
export function PublicMiniatureCard({ miniature, onClick }: PublicMiniatureCardProps) {
  const { id, title, progress, userNickname, likeCount, liked, thumbnailUrl } = miniature
  const statusBadge = getStatusBadge(progress)

  return (
    <Card
      className="cursor-pointer group"
      padding="none"
      hoverable
      onClick={() => onClick(id)}
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

        {/* 메타: 아바타+닉네임 (좌) / 하트+좋아요수 (우) */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-100 text-[10px] font-bold text-forest-600 dark:bg-forest-900/30 dark:text-forest-300">
              {userNickname.charAt(0).toUpperCase()}
            </span>
            <span className="font-medium text-charcoal-500 dark:text-cream-300">
              {userNickname}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <HeartIcon filled={liked} className="h-3.5 w-3.5" />
            {likeCount > 0 && (
              <span className={liked ? 'text-rose-500' : ''}>{likeCount}</span>
            )}
          </span>
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
