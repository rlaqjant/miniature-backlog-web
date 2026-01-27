import { useState, useCallback, useEffect } from 'react'
import { progressLogApi } from '@services/api'
import type { ProgressLogResponse } from '@/types'

interface UsePublicBoard {
  logs: ProgressLogResponse[]
  isLoading: boolean
  error: string | null
  page: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  goToPage: (page: number) => void
  refetch: () => Promise<void>
}

/**
 * 공개 게시판 데이터 로딩 훅
 * 페이지네이션, 로딩/에러 상태 관리
 */
export function usePublicBoard(size = 12): UsePublicBoard {
  const [logs, setLogs] = useState<ProgressLogResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchLogs = useCallback(async (targetPage: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await progressLogApi.getPublic({ page: targetPage, size })
      setLogs(data.content)
      setPage(data.page)
      setTotalPages(data.totalPages)
      setHasNext(data.hasNext)
      setHasPrevious(data.hasPrevious)
    } catch (err) {
      const message = err instanceof Error ? err.message : '공개 게시판을 불러오는데 실패했습니다'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [size])

  useEffect(() => {
    fetchLogs(page)
  }, [fetchLogs, page])

  const goToPage = useCallback((targetPage: number) => {
    setPage(targetPage)
  }, [])

  const refetch = useCallback(async () => {
    await fetchLogs(page)
  }, [fetchLogs, page])

  return {
    logs,
    isLoading,
    error,
    page,
    totalPages,
    hasNext,
    hasPrevious,
    goToPage,
    refetch,
  }
}
