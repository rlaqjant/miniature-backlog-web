import { apiClient } from './client'
import type { BacklogItem, UpdateBacklogItemRequest } from '@/types'

/**
 * 백로그 아이템 관련 API
 */
export const backlogItemApi = {
  /**
   * 백로그 아이템 상태 수정
   */
  updateStatus: async (id: number, data: UpdateBacklogItemRequest): Promise<BacklogItem> => {
    const response = await apiClient.patch<BacklogItem>(`/backlog-items/${id}`, data)
    return response.data
  },
}
