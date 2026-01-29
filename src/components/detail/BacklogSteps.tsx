import type { BacklogItem, BacklogItemStatus } from '@/types'

interface BacklogStepsProps {
  /** 백로그 아이템 목록 */
  items: BacklogItem[]
  /** 상태 변경 핸들러 */
  onStatusChange: (itemId: number, status: BacklogItemStatus) => Promise<void>
  /** 업데이트 중 */
  isUpdating?: boolean
}

/**
 * 상태별 스타일 정의
 */
const statusStyles: Record<BacklogItemStatus, { bg: string; icon: string; text: string }> = {
  TODO: {
    bg: 'bg-cream-100 dark:bg-charcoal-600',
    icon: 'text-stone-400',
    text: '시작 전',
  },
  IN_PROGRESS: {
    bg: 'bg-gold-100 dark:bg-gold-900/30',
    icon: 'text-gold-500',
    text: '진행 중',
  },
  DONE: {
    bg: 'bg-forest-100 dark:bg-forest-900/30',
    icon: 'text-forest-500',
    text: '완료',
  },
}

/**
 * 상태 순환 순서
 */
const statusOrder: BacklogItemStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

const getNextStatus = (current: BacklogItemStatus): BacklogItemStatus => {
  const currentIndex = statusOrder.indexOf(current)
  const nextIndex = (currentIndex + 1) % statusOrder.length
  return statusOrder[nextIndex]
}

/**
 * 5단계 백로그 상태 관리 컴포넌트
 */
export function BacklogSteps({ items, onStatusChange, isUpdating }: BacklogStepsProps) {
  // orderIndex로 정렬
  const sortedItems = [...items].sort((a, b) => a.orderIndex - b.orderIndex)

  const handleClick = async (item: BacklogItem) => {
    if (isUpdating) return
    const nextStatus = getNextStatus(item.status)
    await onStatusChange(item.id, nextStatus)
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
      <h2 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
        작업 단계
      </h2>
      <p className="mt-1 text-sm text-stone-500">각 단계를 클릭하여 상태를 변경하세요</p>

      <div className="mt-5 space-y-3">
        {sortedItems.map((item, index) => {
          const style = statusStyles[item.status]
          const stepName = item.stepName

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              disabled={isUpdating}
              className={`
                w-full flex items-center gap-4 p-4 rounded-xl
                transition-all duration-200
                hover:shadow-md
                disabled:cursor-not-allowed disabled:opacity-50
                ${style.bg}
              `}
            >
              {/* 단계 번호 */}
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-full text-sm font-bold
                  ${item.status === 'DONE'
                    ? 'bg-forest-500 text-cream-50'
                    : item.status === 'IN_PROGRESS'
                      ? 'bg-gold-500 text-charcoal-900'
                      : 'bg-cream-300 text-charcoal-500 dark:bg-charcoal-500 dark:text-cream-200'
                  }
                `}
              >
                {item.status === 'DONE' ? (
                  <CheckIcon />
                ) : item.status === 'IN_PROGRESS' ? (
                  <SpinnerIcon />
                ) : (
                  index + 1
                )}
              </div>

              {/* 단계 이름 */}
              <div className="flex-1 text-left">
                <span
                  className={`
                    font-medium
                    ${item.status === 'DONE'
                      ? 'text-forest-600 dark:text-forest-400'
                      : 'text-charcoal-700 dark:text-cream-200'
                    }
                  `}
                >
                  {stepName}
                </span>
              </div>

              {/* 상태 뱃지 */}
              <span
                className={`
                  shrink-0 rounded-full px-3 py-1 text-xs font-medium
                  ${item.status === 'DONE'
                    ? 'bg-forest-500 text-cream-50'
                    : item.status === 'IN_PROGRESS'
                      ? 'bg-gold-500 text-charcoal-900'
                      : 'bg-cream-300 text-charcoal-500 dark:bg-charcoal-600 dark:text-cream-300'
                  }
                `}
              >
                {style.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* 안내 문구 */}
      <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
        <InfoIcon />
        <span>상태 순환: 시작 전 → 진행 중 → 완료 → 시작 전</span>
      </div>
    </div>
  )
}

// 아이콘 컴포넌트들
function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
