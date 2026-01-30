import { ProgressBar } from '@/components/dashboard/ProgressBar'
import { Button } from '@/components/common'
import type { MiniatureDetail, UpdateMiniatureRequest } from '@/types'

interface MiniatureInfoProps {
  /** 미니어처 상세 정보 */
  miniature: MiniatureDetail
  /** 수정 버튼 클릭 */
  onEdit: () => void
  /** 삭제 버튼 클릭 */
  onDelete: () => void
  /** 공개 상태 토글 */
  onTogglePublic: (data: UpdateMiniatureRequest) => Promise<void>
  /** 업데이트 중 */
  isUpdating?: boolean
}

/**
 * 미니어처 기본 정보 표시 컴포넌트
 * 제목, 설명, 진행률, 공개 토글, 수정/삭제 버튼
 */
export function MiniatureInfo({
  miniature,
  onEdit,
  onDelete,
  onTogglePublic,
  isUpdating,
}: MiniatureInfoProps) {
  const handleTogglePublic = async () => {
    await onTogglePublic({ isPublic: !miniature.isPublic })
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
      {/* 헤더 영역 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-charcoal-900 dark:text-cream-50 sm:text-3xl">
            {miniature.title}
          </h1>
          {miniature.description && (
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              {miniature.description}
            </p>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} disabled={isUpdating}>
            수정
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete} disabled={isUpdating}>
            삭제
          </Button>
        </div>
      </div>

      {/* 진행률 */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-charcoal-500 dark:text-cream-200">
            전체 진행률
          </span>
          <span className="text-sm font-semibold text-forest-500">
            {miniature.progress}%
          </span>
        </div>
        <ProgressBar value={miniature.progress} size="lg" />
      </div>

      {/* 공개 설정 */}
      <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5 dark:border-charcoal-600">
        <div>
          <span className="text-sm font-medium text-charcoal-500 dark:text-cream-200">
            공개 설정
          </span>
          <p className="text-xs text-stone-500">
            {miniature.isPublic
              ? '다른 사용자들이 이 백로그를 볼 수 있습니다'
              : '나만 볼 수 있는 비공개 백로그입니다'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={miniature.isPublic}
          onClick={handleTogglePublic}
          disabled={isUpdating}
          className={`
            relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${miniature.isPublic ? 'bg-forest-500' : 'bg-cream-300 dark:bg-charcoal-500'}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 translate-y-0.5
              rounded-full bg-white shadow-lg ring-0
              transition duration-200 ease-in-out
              ${miniature.isPublic ? 'translate-x-5' : 'translate-x-0.5'}
            `}
          />
        </button>
      </div>

      {/* 메타 정보 */}
      <div className="mt-4 flex gap-4 text-xs text-stone-500">
        <span>
          생성:{' '}
          {new Date(miniature.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <span>
          수정:{' '}
          {new Date(miniature.updatedAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}
