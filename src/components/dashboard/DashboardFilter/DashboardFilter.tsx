import { Select, type SelectOption } from '@/components/common/Select'

export type SortOption = 'updatedAt' | 'createdAt' | 'title' | 'progress'
export type FilterOption = 'all' | 'notStarted' | 'inProgress' | 'done'

interface DashboardFilterProps {
  /** 현재 정렬 옵션 */
  sortBy: SortOption
  /** 정렬 변경 핸들러 */
  onSortChange: (value: SortOption) => void
  /** 현재 필터 옵션 */
  filterBy: FilterOption
  /** 필터 변경 핸들러 */
  onFilterChange: (value: FilterOption) => void
}

const sortOptions: SelectOption[] = [
  { value: 'updatedAt', label: '최근 수정순' },
  { value: 'createdAt', label: '생성일순' },
  { value: 'title', label: '이름순' },
  { value: 'progress', label: '진행률순' },
]

const filterOptions: SelectOption[] = [
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
}: DashboardFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-36">
        <Select
          options={filterOptions}
          value={filterBy}
          onChange={(e) => onFilterChange(e.target.value as FilterOption)}
          aria-label="필터"
        />
      </div>
      <div className="w-36">
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="정렬"
        />
      </div>
    </div>
  )
}
