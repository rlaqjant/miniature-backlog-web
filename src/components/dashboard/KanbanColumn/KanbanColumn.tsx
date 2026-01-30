import { useDroppable } from '@dnd-kit/core'
import { KanbanCard } from '../KanbanCard'
import type { Miniature } from '@/types'

interface KanbanColumnProps {
  /** 컬럼 ID (칸반 단계명) */
  stepId: string
  /** 컬럼 헤더 표시명 */
  label: string
  /** 해당 컬럼의 미니어처 목록 */
  miniatures: Miniature[]
}

/**
 * 칸반 컬럼 컴포넌트
 * 드롭 가능 영역 + 카드 목록
 */
export function KanbanColumn({ stepId, label, miniatures }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: stepId,
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        flex min-h-[200px] w-full min-w-[200px] flex-col rounded-2xl border
        bg-white/50 p-3 transition-colors duration-200
        dark:bg-charcoal-800/50
        ${isOver
          ? 'border-forest-400 bg-forest-50/50 dark:border-forest-500 dark:bg-forest-900/20'
          : 'border-cream-200 dark:border-charcoal-600'
        }
      `}
    >
      {/* 컬럼 헤더 */}
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-charcoal-700 dark:text-cream-100">
          {label}
        </h3>
        <span className="rounded-full bg-cream-200 px-2 py-0.5 text-xs font-medium text-charcoal-500 dark:bg-charcoal-600 dark:text-cream-300">
          {miniatures.length}
        </span>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-1 flex-col gap-2">
        {miniatures.map((miniature) => (
          <KanbanCard key={miniature.id} miniature={miniature} />
        ))}
      </div>
    </div>
  )
}
