import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/common'
import {
  MiniatureList,
  DashboardFilter,
  AddMiniatureModal,
  KanbanBoard,
  type SortOption,
  type FilterOption,
  type ViewMode,
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
        new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
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
 * 화면 크기 감지 훅
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * 대시보드 페이지
 * 자연주의 프리미엄 디자인 시스템
 */
export function DashboardPage() {
  const navigate = useNavigate()
  const {
    miniatures,
    isLoading,
    error,
    refetch,
    createMiniature,
    isCreating,
    updateCurrentStep,
  } = useMiniatures()

  // 필터/정렬 상태
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // 뷰 모드 상태
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // 768px 미만이면 강제 카드 뷰
  const effectiveViewMode = isDesktop ? viewMode : 'card'

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 필터/정렬 적용된 목록 (카드 뷰에서만 사용)
  const displayedMiniatures = useMemo(() => {
    const filtered = filterMiniatures(miniatures, filterBy)
    return sortMiniatures(filtered, sortBy)
  }, [miniatures, filterBy, sortBy])

  // 카드 클릭 핸들러
  const handleCardClick = (id: number) => {
    navigate(`/miniatures/${id}`)
  }

  // 칸반 드래그 완료 핸들러
  const handleStepChange = (miniatureId: number, newStep: string) => {
    updateCurrentStep(miniatureId, newStep)
  }

  // 모달 열기
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-12">
      {/* 헤더 */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-50">
            내 백로그
          </h1>
          <p className="mt-2 text-stone-500">
            도색할 미니어처를 관리하세요
          </p>
        </div>
        <Button onClick={openModal} leftIcon={<PlusIcon />}>
          새 백로그
        </Button>
      </div>

      {/* 필터/정렬 */}
      {miniatures.length > 0 && (
        <div className="mb-8">
          <DashboardFilter
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            viewMode={effectiveViewMode}
            onViewModeChange={setViewMode}
            showViewToggle={isDesktop}
          />
        </div>
      )}

      {/* 칸반 뷰 또는 카드 뷰 */}
      {effectiveViewMode === 'kanban' ? (
        <KanbanBoard
          miniatures={miniatures}
          sortBy={sortBy}
          onStepChange={handleStepChange}
        />
      ) : (
        <MiniatureList
          miniatures={displayedMiniatures}
          isLoading={isLoading}
          error={error}
          onCardClick={handleCardClick}
          onEmptyAction={openModal}
          onRetry={refetch}
        />
      )}

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
