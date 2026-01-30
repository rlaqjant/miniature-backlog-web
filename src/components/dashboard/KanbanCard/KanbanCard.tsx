import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useNavigate } from 'react-router'
import { ProgressBar } from '../ProgressBar'
import type { Miniature } from '@/types'

interface KanbanCardProps {
  miniature: Miniature
}

/**
 * 칸반 카드 컴포넌트
 * 드래그 가능한 컴팩트 카드
 */
export function KanbanCard({ miniature }: KanbanCardProps) {
  const navigate = useNavigate()
  const { id, title, progress, isPublic } = miniature

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `miniature-${id}`,
    data: { miniature },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const handleClick = (e: React.MouseEvent) => {
    // 드래그 중이면 클릭 이벤트 무시
    if (isDragging) return
    // 드래그 리스너와 구분하기 위해 pointerType 확인
    if (e.detail > 0) {
      navigate(`/miniatures/${id}`)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        cursor-grab rounded-xl border border-cream-200 bg-cream-100 p-3
        shadow-soft transition-all duration-200
        hover:shadow-soft-lg hover:-translate-y-0.5
        dark:border-charcoal-600 dark:bg-[#252219]
        ${isDragging ? 'opacity-50 shadow-soft-lg scale-105 z-50' : ''}
      `}
    >
      {/* 제목 */}
      <h4 className="line-clamp-1 text-sm font-semibold text-charcoal-900 dark:text-cream-50">
        {title}
      </h4>

      {/* 진행률 바 */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1">
          <ProgressBar value={progress} size="sm" />
        </div>
        <span className="shrink-0 text-xs font-medium text-stone-500">
          {progress}%
        </span>
      </div>

      {/* 공개 여부 아이콘 */}
      {isPublic && (
        <div className="mt-1.5 flex items-center gap-1 text-xs text-forest-500">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          공개
        </div>
      )}
    </div>
  )
}
