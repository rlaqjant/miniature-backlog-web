import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { miniatureApi, backlogItemApi, progressLogApi, imageApi } from '@/services/api'
import type {
  MiniatureDetail,
  BacklogItemStatus,
  UpdateMiniatureRequest,
  ProgressLogResponse,
  ProgressLogUpdateRequest,
} from '@/types'

/**
 * 업로드 진행 상태
 */
interface UploadProgress {
  step: 'creating' | 'uploading'
  current: number
  total: number
  imagePercent?: number
}

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
  /** 진행 로그 생성 */
  createProgressLog: (content: string, isPublic: boolean, files?: File[]) => Promise<void>
  /** 진행 로그 수정 */
  updateProgressLog: (logId: number, data: ProgressLogUpdateRequest) => Promise<void>
  /** 진행 로그 삭제 */
  deleteProgressLog: (logId: number) => Promise<void>
  /** 진행 로그 생성 중 */
  isCreatingLog: boolean
  /** 진행 로그 수정 중 */
  isUpdatingLog: boolean
  /** 진행 로그 삭제 중 */
  isDeletingLog: boolean
  /** 업로드 진행 상태 */
  uploadProgress: UploadProgress | null
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
  const [isCreatingLog, setIsCreatingLog] = useState(false)
  const [isUpdatingLog, setIsUpdatingLog] = useState(false)
  const [isDeletingLog, setIsDeletingLog] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null)

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

  // 진행 로그 생성 (이미지 포함)
  const createProgressLog = useCallback(
    async (content: string, isPublic: boolean, files?: File[]) => {
      setIsCreatingLog(true)
      setUploadProgress({
        step: 'creating',
        current: 0,
        total: files?.length || 0,
      })
      setError(null)

      try {
        // Step 1: 진행 로그 생성
        const log = await progressLogApi.create({
          miniatureId: id,
          content,
          isPublic,
        })

        // Step 2-4: 이미지 업로드 (있는 경우)
        if (files && files.length > 0) {
          const uploadErrors: string[] = []

          for (let i = 0; i < files.length; i++) {
            setUploadProgress({
              step: 'uploading',
              current: i + 1,
              total: files.length,
              imagePercent: 0,
            })

            try {
              await imageApi.uploadWithProgress(files[i], log.id, (percent) => {
                setUploadProgress((prev) =>
                  prev ? { ...prev, imagePercent: percent } : null
                )
              })
            } catch (err) {
              const errorMsg =
                err instanceof Error ? err.message : `이미지 ${i + 1} 업로드 실패`
              uploadErrors.push(errorMsg)
              console.error(`이미지 ${i + 1} 업로드 실패:`, err)
              // 개별 이미지 실패는 계속 진행
            }
          }

          // 이미지 업로드 실패 시 에러 전파 (모달이 닫히지 않도록)
          if (uploadErrors.length > 0) {
            throw new Error(uploadErrors[0])
          }
        }

        // 목록 새로고침
        const logsData = await progressLogApi.getByMiniature(id, { page: 0, size: 10 })
        setProgressLogs(logsData.content)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '진행 로그 작성에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsCreatingLog(false)
        setUploadProgress(null)
      }
    },
    [id]
  )

  // 진행 로그 수정
  const updateProgressLog = useCallback(
    async (logId: number, data: ProgressLogUpdateRequest) => {
      setIsUpdatingLog(true)
      setError(null)

      try {
        await progressLogApi.update(logId, data)

        // 목록 새로고침
        const logsData = await progressLogApi.getByMiniature(id, { page: 0, size: 10 })
        setProgressLogs(logsData.content)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '진행 로그 수정에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsUpdatingLog(false)
      }
    },
    [id]
  )

  // 진행 로그 삭제
  const deleteProgressLog = useCallback(
    async (logId: number) => {
      setIsDeletingLog(true)
      setError(null)

      try {
        await progressLogApi.delete(logId)

        // 목록 새로고침
        const logsData = await progressLogApi.getByMiniature(id, { page: 0, size: 10 })
        setProgressLogs(logsData.content)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '진행 로그 삭제에 실패했습니다'
        setError(message)
        throw err
      } finally {
        setIsDeletingLog(false)
      }
    },
    [id]
  )

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
    createProgressLog,
    updateProgressLog,
    deleteProgressLog,
    isCreatingLog,
    isUpdatingLog,
    isDeletingLog,
    uploadProgress,
  }
}
