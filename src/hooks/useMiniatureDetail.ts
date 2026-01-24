import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { miniatureApi, backlogItemApi, progressLogApi } from '@/services/api'
import type {
  MiniatureDetail,
  BacklogItemStatus,
  UpdateMiniatureRequest,
  ProgressLogResponse,
} from '@/types'

interface UseMiniatureDetail {
  /** 미니어처 상세 정보 */
  miniature: MiniatureDetail | null
  /** 진행 로그 목록 */
  progressLogs: ProgressLogResponse[]
  /** 로딩 상태 */
  isLoading: boolean
  /** 에러 메시지 */
  error: string | null
  /** 데이터 새로고침 */
  refetch: () => Promise<void>
  /** 백로그 아이템 상태 변경 */
  updateBacklogStatus: (itemId: number, status: BacklogItemStatus) => Promise<void>
  /** 미니어처 정보 수정 */
  updateMiniature: (data: UpdateMiniatureRequest) => Promise<void>
  /** 미니어처 삭제 */
  deleteMiniature: () => Promise<void>
  /** 상태 업데이트 중 */
  isUpdating: boolean
  /** 삭제 중 */
  isDeleting: boolean
}

/**
 * 미니어처 상세 정보 관리 훅
 */
export function useMiniatureDetail(id: number): UseMiniatureDetail {
  const navigate = useNavigate()
  const [miniature, setMiniature] = useState<MiniatureDetail | null>(null)
  const [progressLogs, setProgressLogs] = useState<ProgressLogResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // 상세 정보 조회
  const fetchDetail = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // 상세 정보와 진행 로그를 동시에 조회
      const [detailData, logsData] = await Promise.all([
        miniatureApi.getById(id),
        progressLogApi.getByMiniature(id, { page: 0, size: 10 }),
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

  // 초기 로드
  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  // 백로그 아이템 상태 변경
  const updateBacklogStatus = useCallback(
    async (itemId: number, status: BacklogItemStatus) => {
      if (!miniature) return

      setIsUpdating(true)
      try {
        const updatedItem = await backlogItemApi.updateStatus(itemId, { status })

        // 로컬 상태 업데이트
        setMiniature((prev) => {
          if (!prev) return prev
          return {
            ...prev,
            backlogItems: prev.backlogItems.map((item) =>
              item.id === itemId ? { ...item, ...updatedItem } : item
            ),
          }
        })

        // 진행률 업데이트를 위해 전체 새로고침
        const updatedMiniature = await miniatureApi.getById(id)
        setMiniature(updatedMiniature)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '상태 변경에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [id, miniature]
  )

  // 미니어처 정보 수정
  const updateMiniature = useCallback(
    async (data: UpdateMiniatureRequest) => {
      if (!miniature) return

      setIsUpdating(true)
      try {
        await miniatureApi.update(id, data)
        // 새로고침
        const updatedMiniature = await miniatureApi.getById(id)
        setMiniature(updatedMiniature)
      } catch (err) {
        const message = err instanceof Error ? err.message : '수정에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [id, miniature]
  )

  // 미니어처 삭제
  const deleteMiniature = useCallback(async () => {
    setIsDeleting(true)
    try {
      await miniatureApi.delete(id)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다'
      setError(message)
      throw err
    } finally {
      setIsDeleting(false)
    }
  }, [id, navigate])

  return {
    miniature,
    progressLogs,
    isLoading,
    error,
    refetch: fetchDetail,
    updateBacklogStatus,
    updateMiniature,
    deleteMiniature,
    isUpdating,
    isDeleting,
  }
}
