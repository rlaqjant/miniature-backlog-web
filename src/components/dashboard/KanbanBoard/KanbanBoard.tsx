import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { KanbanColumn } from '../KanbanColumn'
import { KanbanCard } from '../KanbanCard'
import type { Miniature } from '@/types'
import type { SortOption } from '../DashboardFilter'

/** 칸반 컬럼 정의 */
const KANBAN_COLUMNS = [
  { id: '시작전', label: '시작전' },
  { id: '언박싱', label: '언박싱' },
  { id: '조립', label: '조립' },
  { id: '프라이밍', label: '프라이밍' },
  { id: '도색', label: '도색' },
  { id: '완료', label: '완료' },
] as const

interface KanbanBoardProps {
  /** 미니어처 목록 */
  miniatures: Miniature[]
  /** 정렬 옵션 */
  sortBy: SortOption
  /** 단계 변경 콜백 */
  onStepChange: (miniatureId: number, newStep: string) => void
}

/**
 * 컬럼 내 정렬 함수
 */
function sortItems(items: Miniature[], sort: SortOption): Miniature[] {
  const sorted = [...items]
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
 * 칸반 보드 컴포넌트
 * @dnd-kit 기반 드래그 앤 드롭
 */
export function KanbanBoard({ miniatures, sortBy, onStepChange }: KanbanBoardProps) {
  const [activeMiniature, setActiveMiniature] = useState<Miniature | null>(null)

  // 드래그 시작 감도 설정 (클릭과 구분)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // 컬럼별 미니어처 분배
  const columnItems = useMemo(() => {
    const grouped: Record<string, Miniature[]> = {}
    for (const col of KANBAN_COLUMNS) {
      grouped[col.id] = []
    }
    for (const m of miniatures) {
      const step = m.currentStep || '시작전'
      if (grouped[step]) {
        grouped[step].push(m)
      } else {
        // 알 수 없는 step이면 시작전으로
        grouped['시작전'].push(m)
      }
    }
    // 각 컬럼 내 정렬
    for (const key of Object.keys(grouped)) {
      grouped[key] = sortItems(grouped[key], sortBy)
    }
    return grouped
  }, [miniatures, sortBy])

  const handleDragStart = (event: DragStartEvent) => {
    const { miniature } = event.active.data.current as { miniature: Miniature }
    setActiveMiniature(miniature)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveMiniature(null)

    const { active, over } = event
    if (!over) return

    const miniature = active.data.current?.miniature as Miniature | undefined
    if (!miniature) return

    const newStep = over.id as string
    // 같은 컬럼이면 무시
    if (miniature.currentStep === newStep) return

    onStepChange(miniature.id, newStep)
  }

  const handleDragCancel = () => {
    setActiveMiniature(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            stepId={column.id}
            label={column.label}
            miniatures={columnItems[column.id] || []}
          />
        ))}
      </div>

      {/* 드래그 오버레이 */}
      <DragOverlay>
        {activeMiniature ? (
          <div className="w-[200px]">
            <KanbanCard miniature={activeMiniature} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
