import { apiClient } from './client'
import type {
  ProgressLogResponse,
  ProgressLogCreateRequest,
  ProgressLogUpdateRequest,
  PageResponse,
  PaginationParams,
} from '@/types'

/**
 * 진행 로그 관련 API
 */
export const progressLogApi = {
  /**
   * 미니어처의 진행 로그 목록 조회
   * GET /progress-logs?miniatureId={id}&page=0&size=10
   */
  getByMiniature: async (
    miniatureId: number,
    params?: PaginationParams
  ): Promise<PageResponse<ProgressLogResponse>> => {
    const response = await apiClient.get<PageResponse<ProgressLogResponse>>(
      '/progress-logs',
      { params: { miniatureId, ...params } }
    )
    return response.data
  },

  /**
   * 공개 진행 로그 피드 조회
   * GET /public/progress-logs
   */
  getPublic: async (params?: PaginationParams): Promise<PageResponse<ProgressLogResponse>> => {
    const response = await apiClient.get<PageResponse<ProgressLogResponse>>(
      '/public/progress-logs',
      { params }
    )
    return response.data
  },

  /**
   * 진행 로그 생성
   * POST /progress-logs
   */
  create: async (data: ProgressLogCreateRequest): Promise<ProgressLogResponse> => {
    const response = await apiClient.post<ProgressLogResponse>('/progress-logs', data)
    return response.data
  },

  /**
   * 진행 로그 수정
   */
  update: async (id: number, data: ProgressLogUpdateRequest): Promise<ProgressLogResponse> => {
    const response = await apiClient.patch<ProgressLogResponse>(`/progress-logs/${id}`, data)
    return response.data
  },

  /**
   * 진행 로그 삭제
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/progress-logs/${id}`)
  },

  /**
   * 공개 미니어처의 진행 로그 목록 조회
   * GET /public/miniatures/{id}/progress-logs
   */
  getPublicByMiniature: async (
    miniatureId: number,
    params?: PaginationParams
  ): Promise<PageResponse<ProgressLogResponse>> => {
    const response = await apiClient.get<PageResponse<ProgressLogResponse>>(
      `/public/miniatures/${miniatureId}/progress-logs`,
      { params }
    )
    return response.data
  },
}
