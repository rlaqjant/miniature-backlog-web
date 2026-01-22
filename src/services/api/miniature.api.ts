import { apiClient } from './client'
import type {
  Miniature,
  MiniatureDetail,
  CreateMiniatureRequest,
  UpdateMiniatureRequest,
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
  getById: async (id: string): Promise<MiniatureDetail> => {
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
  update: async (id: string, data: UpdateMiniatureRequest): Promise<Miniature> => {
    const response = await apiClient.patch<Miniature>(`/miniatures/${id}`, data)
    return response.data
  },

  /**
   * 백로그 삭제
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/miniatures/${id}`)
  },
}
