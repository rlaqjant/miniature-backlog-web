import type { ProgressLogResponse } from '@/types'

interface ProgressLogListProps {
  /** 진행 로그 목록 */
  logs: ProgressLogResponse[]
}

/**
 * 진행 로그 목록 컴포넌트
 */
export function ProgressLogList({ logs }: ProgressLogListProps) {
  if (logs.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
        <h2 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
          진행 기록
        </h2>
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
      <h2 className="font-display text-lg font-semibold text-charcoal-900 dark:text-cream-50">
        진행 기록
      </h2>

      <div className="mt-5 space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="relative border-l-2 border-cream-300 pl-4 dark:border-charcoal-500"
          >
            {/* 타임라인 도트 */}
            <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-forest-500" />

            {/* 날짜 */}
            <time className="text-xs text-stone-500">
              {new Date(log.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>

            {/* 내용 */}
            <p className="mt-1 text-charcoal-700 dark:text-cream-200">{log.content}</p>

            {/* 이미지 */}
            {log.images && log.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {log.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt="진행 이미지"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
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
