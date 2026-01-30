import { apiClient } from './client'
import type {
  Miniature,
  MiniatureDetail,
  CreateMiniatureRequest,
  UpdateMiniatureRequest,
  PublicMiniature,
  PublicMiniatureDetail,
  PageResponse,
  PaginationParams,
} from '@/types'

/**
 * 미니어처(백로그) 관련 API
 */
export const miniatureApi = {
  /**
   * 내 백로그 목록 조회
   */
  getList: async (): Promise<Miniature[]> => {
    const response = await apiClient.get<Miniature[]>('/miniatures')
    return response.data
  },

  /**
   * 백로그 상세 조회
   */
  getById: async (id: number): Promise<MiniatureDetail> => {
    const response = await apiClient.get<MiniatureDetail>(`/miniatures/${id}`)
    return response.data
  },

  /**
   * 백로그 생성
   */
  create: async (data: CreateMiniatureRequest): Promise<Miniature> => {
    const response = await apiClient.post<Miniature>('/miniatures', data)
    return response.data
  },

  /**
   * 백로그 수정
   */
  update: async (id: number, data: UpdateMiniatureRequest): Promise<Miniature> => {
    const response = await apiClient.patch<Miniature>(`/miniatures/${id}`, data)
    return response.data
  },

  /**
   * 백로그 삭제
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/miniatures/${id}`)
  },

  /**
   * 단계 일괄 변경 (칸반 드래그)
   */
  updateCurrentStep: async (id: number, currentStep: string): Promise<Miniature> => {
    const response = await apiClient.patch<Miniature>(
      `/miniatures/${id}/current-step`,
      { currentStep }
    )
    return response.data
  },

  /**
   * 공개 미니어처 목록 조회
   * GET /public/miniatures
   */
  getPublicList: async (params?: PaginationParams): Promise<PageResponse<PublicMiniature>> => {
    const response = await apiClient.get<PageResponse<PublicMiniature>>(
      '/public/miniatures',
      { params }
    )
    return response.data
  },

  /**
   * 공개 미니어처 상세 조회
   * GET /public/miniatures/{id}
   */
  getPublicById: async (id: number): Promise<PublicMiniatureDetail> => {
    const response = await apiClient.get<PublicMiniatureDetail>(`/public/miniatures/${id}`)
    return response.data
  },
}
