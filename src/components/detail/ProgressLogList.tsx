import { useAuthStore } from '@/stores/authStore'
import type { ProgressLogResponse } from '@/types'

interface ProgressLogListProps {
  /** 진행 로그 목록 */
  logs: ProgressLogResponse[]
  /** 기록 추가 버튼 클릭 핸들러 */
  onAddLog?: () => void
  /** 로그 삭제 핸들러 */
  onDeleteLog?: (logId: number) => void
  /** 삭제 중 상태 */
  isDeletingLog?: boolean
}

/**
 * 진행 로그 목록 컴포넌트
 */
export function ProgressLogList({
  logs,
  onAddLog,
  onDeleteLog,
  isDeletingLog,
}: ProgressLogListProps) {
  const { user } = useAuthStore()
  const currentUserId = user?.id

  if (logs.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
            진행 기록
          </h2>
          {onAddLog && (
            <button
              onClick={onAddLog}
              className="inline-flex items-center gap-1 rounded-lg bg-forest-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-forest-600"
            >
              <PlusIcon />
              기록 추가
            </button>
          )}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center py-8 text-center">
          <EmptyIcon />
          <p className="mt-4 text-stone-500">아직 기록된 진행 사항이 없습니다</p>
          <p className="mt-1 text-sm text-stone-400">
            작업 진행 상황을 기록해보세요
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
          진행 기록
        </h2>
        {onAddLog && (
          <button
            onClick={onAddLog}
            className="inline-flex items-center gap-1 rounded-lg bg-forest-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-forest-600"
          >
            <PlusIcon />
            기록 추가
          </button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="group relative border-l-2 border-cream-300 pl-4 dark:border-charcoal-500"
          >
            {/* 타임라인 도트 */}
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-forest-500" />

            {/* 헤더: 날짜 + 삭제 버튼 */}
            <div className="flex items-center justify-between">
              <time className="text-xs text-stone-500">
                {new Date(log.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>

              {/* 본인 로그만 삭제 가능 */}
              {onDeleteLog && currentUserId === log.userId && (
                <button
                  onClick={() => onDeleteLog(log.id)}
                  disabled={isDeletingLog}
                  className="opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
                  title="삭제"
                >
                  <TrashIcon className="h-4 w-4 text-stone-400 hover:text-red-500" />
                </button>
              )}
            </div>

            {/* 내용 */}
            <p className="mt-1 whitespace-pre-wrap text-charcoal-700 dark:text-cream-200">
              {log.content}
            </p>

            {/* 이미지 */}
            {log.images && log.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {log.images.map((image) => (
                  <a
                    key={image.id}
                    href={image.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.fileName}
                      className="h-20 w-20 rounded-lg object-cover transition-transform hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            )}

            {/* 공개 상태 */}
            {!log.isPublic && (
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-stone-400">
                <LockIcon />
                비공개
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

function EmptyIcon() {
  return (
    <svg
      className="h-12 w-12 text-stone-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}
