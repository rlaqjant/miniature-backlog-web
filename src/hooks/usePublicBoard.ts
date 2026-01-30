import { useState, useCallback, useEffect } from 'react'
import { miniatureApi } from '@services/api'
import type { PublicMiniature } from '@/types'

interface UsePublicBoard {
  miniatures: PublicMiniature[]
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
 * 공개 미니어처 목록 조회, 페이지네이션, 로딩/에러 상태 관리
 */
export function usePublicBoard(size = 12): UsePublicBoard {
  const [miniatures, setMiniatures] = useState<PublicMiniature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchMiniatures = useCallback(async (targetPage: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await miniatureApi.getPublicList({ page: targetPage, size })
      setMiniatures(data.content)
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
    fetchMiniatures(page)
  }, [fetchMiniatures, page])

  const goToPage = useCallback((targetPage: number) => {
    setPage(targetPage)
  }, [])

  const refetch = useCallback(async () => {
    await fetchMiniatures(page)
  }, [fetchMiniatures, page])

  return {
    miniatures,
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
