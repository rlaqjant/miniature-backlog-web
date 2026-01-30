import { useState, useEffect, useCallback } from 'react'
import { miniatureApi } from '@/services/api'
import type { Miniature, CreateMiniatureRequest } from '@/types'

interface UseMiniatures {
  /** 미니어처 목록 */
  miniatures: Miniature[]
  /** 로딩 상태 */
  isLoading: boolean
  /** 에러 메시지 */
  error: string | null
  /** 목록 새로고침 */
  refetch: () => Promise<void>
  /** 미니어처 생성 */
  createMiniature: (data: CreateMiniatureRequest) => Promise<Miniature>
  /** 생성 중 상태 */
  isCreating: boolean
  /** 단계 일괄 변경 (칸반 드래그) */
  updateCurrentStep: (id: number, step: string) => Promise<void>
}

/**
 * 미니어처 목록 관리 훅
 */
export function useMiniatures(): UseMiniatures {
  const [miniatures, setMiniatures] = useState<Miniature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // 목록 조회
  const fetchMiniatures = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await miniatureApi.getList()
      setMiniatures(data)
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : '백로그 목록을 불러오는데 실패했습니다'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 초기 로드
  useEffect(() => {
    fetchMiniatures()
  }, [fetchMiniatures])

  // 미니어처 생성
  const createMiniature = useCallback(async (data: CreateMiniatureRequest): Promise<Miniature> => {
    setIsCreating(true)
    try {
      const newMiniature = await miniatureApi.create(data)
      // 목록에 추가
      setMiniatures((prev) => [newMiniature, ...prev])
      return newMiniature
    } finally {
      setIsCreating(false)
    }
  }, [])

  // 단계 일괄 변경 (낙관적 업데이트)
  const updateCurrentStep = useCallback(async (id: number, step: string) => {
    // 이전 상태 저장 (롤백용)
    const previousMiniatures = miniatures

    // 낙관적 업데이트: 즉시 로컬 상태 변경
    setMiniatures((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, currentStep: step } : m
      )
    )

    try {
      // API 호출
      const updated = await miniatureApi.updateCurrentStep(id, step)
      // 서버 응답으로 정확한 값 반영
      setMiniatures((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
      )
    } catch {
      // 실패 시 롤백
      setMiniatures(previousMiniatures)
    }
  }, [miniatures])

  return {
    miniatures,
    isLoading,
    error,
    refetch: fetchMiniatures,
    createMiniature,
    isCreating,
    updateCurrentStep,
  }
}
