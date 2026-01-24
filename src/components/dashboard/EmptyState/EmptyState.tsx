import { Button } from '@/components/common'

interface EmptyStateProps {
  /** 제목 */
  title?: string
  /** 설명 */
  description?: string
  /** 액션 버튼 텍스트 */
  actionText?: string
  /** 액션 핸들러 */
  onAction?: () => void
}

/**
 * 빈 상태 UI 컴포넌트
 */
export function EmptyState({
  title = '백로그가 없습니다',
  description = '첫 번째 미니어처 백로그를 추가해보세요!',
  actionText = '새 백로그 추가',
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-12 dark:border-gray-600">
      {/* 아이콘 */}
      <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
        <svg
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>

      {/* 텍스트 */}
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {/* 액션 버튼 */}
      {onAction && (
        <Button onClick={onAction} leftIcon={<PlusIcon />}>
          {actionText}
        </Button>
      )}
    </div>
  )
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}
