interface PaginationProps {
  /** 현재 페이지 (0-based) */
  page: number
  /** 총 페이지 수 */
  totalPages: number
  /** 이전 페이지 존재 여부 */
  hasPrevious: boolean
  /** 다음 페이지 존재 여부 */
  hasNext: boolean
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void
}

/**
 * 공통 페이지네이션 컴포넌트
 * 이전/다음 버튼 + 페이지 번호 표시
 */
export function Pagination({
  page,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  // 표시할 페이지 번호 계산 (최대 5개)
  const getPageNumbers = (): number[] => {
    const maxVisible = 5
    let start = Math.max(0, page - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible)

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible)
    }

    return Array.from({ length: end - start }, (_, i) => start + i)
  }

  const pageNumbers = getPageNumbers()

  const buttonBase =
    'flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors'
  const buttonDisabled = 'cursor-not-allowed text-stone-300 dark:text-charcoal-500'
  const buttonEnabled =
    'text-charcoal-500 hover:bg-cream-200 dark:text-cream-200 dark:hover:bg-charcoal-500'
  const buttonActive =
    'bg-forest-500 text-cream-50 hover:bg-forest-600 dark:bg-forest-600 dark:hover:bg-forest-500'

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="페이지네이션">
      {/* 이전 버튼 */}
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className={`${buttonBase} ${hasPrevious ? buttonEnabled : buttonDisabled}`}
        aria-label="이전 페이지"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 페이지 번호 */}
      {pageNumbers[0] > 0 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(0)}
            className={`${buttonBase} ${buttonEnabled}`}
          >
            1
          </button>
          {pageNumbers[0] > 1 && (
            <span className="flex h-9 min-w-9 items-center justify-center text-sm text-stone-400">
              ...
            </span>
          )}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onPageChange(num)}
          className={`${buttonBase} ${num === page ? buttonActive : buttonEnabled}`}
          aria-current={num === page ? 'page' : undefined}
        >
          {num + 1}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 2 && (
            <span className="flex h-9 min-w-9 items-center justify-center text-sm text-stone-400">
              ...
            </span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages - 1)}
            className={`${buttonBase} ${buttonEnabled}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 버튼 */}
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={`${buttonBase} ${hasNext ? buttonEnabled : buttonDisabled}`}
        aria-label="다음 페이지"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}
