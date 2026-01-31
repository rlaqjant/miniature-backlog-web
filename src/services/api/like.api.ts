import { apiClient } from './client'
import type { LikeResponse } from '@/types'

/**
 * 좋아요 관련 API
 */
export const likeApi = {
  /**
   * 좋아요 토글 (로그인 필요)
   */
  toggle: async (miniatureId: number): Promise<LikeResponse> => {
    const response = await apiClient.post<LikeResponse>(`/miniatures/${miniatureId}/like`)
    return response.data
  },
}
