import { Select, type SelectOption } from '@/components/common/Select'

export type SortOption = 'updatedAt' | 'createdAt' | 'title' | 'progress'
export type FilterOption = 'all' | 'notStarted' | 'inProgress' | 'done'
export type ViewMode = 'card' | 'kanban'

interface DashboardFilterProps {
  /** 현재 정렬 옵션 */
  sortBy: SortOption
  /** 정렬 변경 핸들러 */
  onSortChange: (value: SortOption) => void
  /** 현재 필터 옵션 */
  filterBy: FilterOption
  /** 필터 변경 핸들러 */
  onFilterChange: (value: FilterOption) => void
  /** 현재 뷰 모드 */
  viewMode?: ViewMode
  /** 뷰 모드 변경 핸들러 */
  onViewModeChange?: (value: ViewMode) => void
  /** 뷰 모드 토글 표시 여부 */
  showViewToggle?: boolean
}

const sortOptions: SelectOption[] = [
  { value: 'updatedAt', label: '최근 수정순' },
  { value: 'createdAt', label: '생성일순' },
  { value: 'title', label: '이름순' },
  { value: 'progress', label: '진행률순' },
]

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'notStarted', label: '시작 전' },
  { value: 'inProgress', label: '진행 중' },
  { value: 'done', label: '완료' },
]

/**
 * 대시보드 필터/정렬 컴포넌트
 */
export function DashboardFilter({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  viewMode = 'card',
  onViewModeChange,
  showViewToggle = false,
}: DashboardFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 칸반 모드일 때 진행 상태 필터 숨김 */}
      {viewMode !== 'kanban' && (
        <div className="flex gap-2" role="group" aria-label="상태 필터">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`rounded-lg border px-4 py-3 font-medium transition-all duration-200 ${
                filterBy === option.value
                  ? 'border-forest-500 bg-forest-500 text-cream-50'
                  : 'border-cream-200 bg-white text-charcoal-500 hover:bg-cream-100 dark:border-charcoal-600 dark:bg-[#1a1814] dark:text-cream-200 dark:hover:bg-charcoal-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <div className="w-36">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="정렬"
        />
      </div>

      {/* 뷰 모드 토글 */}
      {showViewToggle && onViewModeChange && (
        <div className="ml-auto flex rounded-lg border border-cream-200 dark:border-charcoal-600" role="group" aria-label="뷰 모드">
          <button
            type="button"
            onClick={() => onViewModeChange('card')}
            className={`rounded-l-lg px-3 py-3 transition-all duration-200 ${
              viewMode === 'card'
                ? 'bg-forest-500 text-cream-50'
                : 'bg-white text-charcoal-500 hover:bg-cream-100 dark:bg-[#1a1814] dark:text-cream-200 dark:hover:bg-charcoal-700'
            }`}
            aria-label="카드 뷰"
            title="카드 뷰"
          >
            <GridIcon />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('kanban')}
            className={`rounded-r-lg border-l border-cream-200 px-3 py-3 transition-all duration-200 dark:border-charcoal-600 ${
              viewMode === 'kanban'
                ? 'bg-forest-500 text-cream-50'
                : 'bg-white text-charcoal-500 hover:bg-cream-100 dark:bg-[#1a1814] dark:text-cream-200 dark:hover:bg-charcoal-700'
            }`}
            aria-label="칸반 뷰"
            title="칸반 뷰"
          >
            <KanbanIcon />
          </button>
        </div>
      )}
    </div>
  )
}

/** 그리드(카드) 아이콘 */
function GridIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  )
}

/** 칸반 아이콘 */
function KanbanIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 4h6M9 4a2 2 0 01-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 01-2-2zm6 0a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2h2zm0 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2z"
      />
    </svg>
  )
}
