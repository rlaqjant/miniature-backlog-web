import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/common'
import {
  MiniatureList,
  DashboardFilter,
  AddMiniatureModal,
  type SortOption,
  type FilterOption,
} from '@/components/dashboard'
import { useMiniatures } from '@/hooks'
import type { Miniature } from '@/types'

/**
 * 목록 필터링
 */
function filterMiniatures(miniatures: Miniature[], filter: FilterOption): Miniature[] {
  switch (filter) {
    case 'notStarted':
      return miniatures.filter((m) => m.progress === 0)
    case 'inProgress':
      return miniatures.filter((m) => m.progress > 0 && m.progress < 100)
    case 'done':
      return miniatures.filter((m) => m.progress === 100)
    default:
      return miniatures
  }
}

/**
 * 목록 정렬
 */
function sortMiniatures(miniatures: Miniature[], sort: SortOption): Miniature[] {
  const sorted = [...miniatures]

  switch (sort) {
    case 'updatedAt':
      return sorted.sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    case 'createdAt':
      return sorted.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'))
    case 'progress':
      return sorted.sort((a, b) => b.progress - a.progress)
    default:
      return sorted
  }
}

/**
 * 대시보드 페이지
 */
export function DashboardPage() {
  const navigate = useNavigate()
  const { miniatures, isLoading, error, refetch, createMiniature, isCreating } =
    useMiniatures()

  // 필터/정렬 상태
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 필터/정렬 적용된 목록
  const displayedMiniatures = useMemo(() => {
    const filtered = filterMiniatures(miniatures, filterBy)
    return sortMiniatures(filtered, sortBy)
  }, [miniatures, filterBy, sortBy])

  // 카드 클릭 핸들러
  const handleCardClick = (id: string) => {
    navigate(`/miniatures/${id}`)
  }

  // 모달 열기
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            내 백로그
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            도색할 미니어처를 관리하세요
          </p>
        </div>
        <Button onClick={openModal} leftIcon={<PlusIcon />}>
          새 백로그
        </Button>
      </div>

      {/* 필터/정렬 */}
      {miniatures.length > 0 && (
        <div className="mb-6">
          <DashboardFilter
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
          />
        </div>
      )}

      {/* 목록 */}
      <MiniatureList
        miniatures={displayedMiniatures}
        isLoading={isLoading}
        error={error}
        onCardClick={handleCardClick}
        onEmptyAction={openModal}
        onRetry={refetch}
      />

      {/* 추가 모달 */}
      <AddMiniatureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={createMiniature}
        isSubmitting={isCreating}
      />
    </div>
  )
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  )
}
