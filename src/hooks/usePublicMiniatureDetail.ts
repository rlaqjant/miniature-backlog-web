import { useState, useEffect, useCallback } from 'react'
import { miniatureApi, progressLogApi, likeApi } from '@/services/api'
import { useAuthStore } from '@/stores'
import type { PublicMiniatureDetail, ProgressLogResponse } from '@/types'

interface UsePublicMiniatureDetail {
  /** 미니어처 상세 정보 */
  miniature: PublicMiniatureDetail | null
  /** 공개 진행 로그 목록 */
  progressLogs: ProgressLogResponse[]
  /** 로딩 상태 */
  isLoading: boolean
  /** 에러 메시지 */
  error: string | null
  /** 데이터 새로고침 */
  refetch: () => Promise<void>
  /** 좋아요 토글 */
  toggleLike: () => Promise<void>
}

/**
 * 공개 미니어처 상세 정보 조회 훅 (좋아요 토글 포함)
 */
export function usePublicMiniatureDetail(id: number): UsePublicMiniatureDetail {
  const [miniature, setMiniature] = useState<PublicMiniatureDetail | null>(null)
  const [progressLogs, setProgressLogs] = useState<ProgressLogResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDetail = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 상세 정보와 공개 진행 로그를 동시에 조회
      const [detailData, logsData] = await Promise.all([
        miniatureApi.getPublicById(id),
        progressLogApi.getPublicByMiniature(id, { page: 0, size: 10 }),
      ])

      setMiniature(detailData)
      setProgressLogs(logsData.content)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '상세 정보를 불러오는데 실패했습니다'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  /**
   * 좋아요 토글 (낙관적 업데이트)
   */
  const toggleLike = useCallback(async () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated || !miniature) return

    // 낙관적 업데이트
    const prevLiked = miniature.liked
    const prevCount = miniature.likeCount
    const newLiked = !prevLiked
    const newCount = newLiked ? prevCount + 1 : prevCount - 1

    setMiniature(prev => prev ? { ...prev, liked: newLiked, likeCount: newCount } : prev)

    try {
      const response = await likeApi.toggle(id)
      // 서버 응답으로 최종 상태 반영
      setMiniature(prev => prev ? { ...prev, liked: response.liked, likeCount: response.likeCount } : prev)
    } catch {
      // 실패 시 롤백
      setMiniature(prev => prev ? { ...prev, liked: prevLiked, likeCount: prevCount } : prev)
    }
  }, [id, miniature])

  return {
    miniature,
    progressLogs,
    isLoading,
    error,
    refetch: fetchDetail,
    toggleLike,
  }
}
