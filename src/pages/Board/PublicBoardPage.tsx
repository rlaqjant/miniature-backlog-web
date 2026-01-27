import { useState } from 'react'
import { usePublicBoard } from '@hooks/usePublicBoard'
import { Spinner, Pagination } from '@components/common'
import { PublicLogCard } from '@components/board/PublicLogCard'
import { PublicLogDetailModal } from '@components/board/PublicLogDetailModal'
import type { ProgressLogResponse } from '@/types'

/**
 * 공개 게시판 페이지
 * 공개 설정된 진행 로그를 누구나 조회 가능
 */
export function PublicBoardPage() {
  const { logs, isLoading, error, page, totalPages, hasNext, hasPrevious, goToPage, refetch } =
    usePublicBoard()

  const [selectedLog, setSelectedLog] = useState<ProgressLogResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (log: ProgressLogResponse) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLog(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* 헤더 */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-50">
          공개 게시판
        </h1>
        <p className="mt-2 text-stone-500">다른 페인터들의 도색 진행 기록을 구경해보세요</p>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      )}

      {/* 에러 상태 */}
      {error && !isLoading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10">
          <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* 빈 상태 */}
      {!isLoading && !error && logs.length === 0 && (
        <div className="rounded-2xl border border-cream-200 bg-cream-100 p-12 text-center dark:border-charcoal-500 dark:bg-[#252219]">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-stone-300 dark:text-charcoal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="text-lg font-medium text-charcoal-500 dark:text-cream-200">
            아직 공개된 진행 기록이 없습니다
          </p>
          <p className="mt-1 text-sm text-stone-400">
            첫 번째로 도색 기록을 공유해보세요!
          </p>
        </div>
      )}

      {/* 카드 그리드 */}
      {!isLoading && !error && logs.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {logs.map((log) => (
              <PublicLogCard key={log.id} log={log} onClick={handleCardClick} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-10">
            <Pagination
              page={page}
              totalPages={totalPages}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
              onPageChange={goToPage}
            />
          </div>
        </>
      )}

      {/* 상세 모달 */}
      <PublicLogDetailModal
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
