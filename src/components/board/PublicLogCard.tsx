import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Card } from '@components/common'
import type { ProgressLogResponse } from '@/types'

interface PublicLogCardProps {
  log: ProgressLogResponse
  onClick: (log: ProgressLogResponse) => void
}

/**
 * 공개 진행 로그 카드 컴포넌트
 * 작성자, 미니어처 제목, 내용 미리보기, 썸네일, 상대 시간 표시
 */
export function PublicLogCard({ log, onClick }: PublicLogCardProps) {
  const { userNickname, miniatureTitle, content, createdAt, images } = log
  const hasImages = images && images.length > 0
  const thumbnailUrl = hasImages ? images[0].imageUrl : null
  const imageCount = images?.length ?? 0

  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  })

  return (
    <Card
      padding="none"
      hoverable
      className="cursor-pointer group"
      onClick={() => onClick(log)}
    >
      {/* 썸네일 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 dark:bg-charcoal-500">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${miniatureTitle} 진행 사진`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-12 w-12 text-stone-300 dark:text-charcoal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
        )}

        {/* 이미지 개수 배지 */}
        {imageCount > 1 && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-charcoal-900/70 px-2 py-1 text-xs font-medium text-cream-50">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {imageCount}
          </span>
        )}
      </div>

      {/* 내용 */}
      <div className="p-4">
        {/* 미니어처 제목 */}
        <h3 className="font-display mb-1 text-sm font-semibold text-charcoal-900 group-hover:text-forest-500 transition-colors dark:text-cream-50 line-clamp-1">
          {miniatureTitle}
        </h3>

        {/* 내용 미리보기 */}
        <p className="mb-3 text-sm text-stone-500 line-clamp-2 dark:text-stone-400">
          {content}
        </p>

        {/* 작성자 및 시간 */}
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
          <span className="font-medium text-charcoal-500 dark:text-cream-300">
            {userNickname}
          </span>
          <span>{relativeTime}</span>
        </div>
      </div>
    </Card>
  )
}
