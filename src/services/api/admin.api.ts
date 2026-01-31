import { apiClient } from './client'
import type {
  AdminMiniature,
  AdminUser,
  MiniatureSearchParams,
  PageResponse,
  UserSearchParams,
} from '@/types'

/**
 * 관리자 전용 API
 */
export const adminApi = {
  /**
   * 게시글(미니어처) 목록 조회 (제목/작성자 분리 검색)
   */
  getMiniatures: async (params?: MiniatureSearchParams): Promise<PageResponse<AdminMiniature>> => {
    const response = await apiClient.get<PageResponse<AdminMiniature>>(
      '/admin/miniatures',
      { params }
    )
    return response.data
  },

  /**
   * 게시글 공개 여부 토글
   */
  updateMiniature: async (id: number, data: { isPublic: boolean }): Promise<void> => {
    await apiClient.patch(`/admin/miniatures/${id}`, data)
  },

  /**
   * 게시글 삭제
   */
  deleteMiniature: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/miniatures/${id}`)
  },

  /**
   * 사용자 목록 조회 (이메일/닉네임 분리 검색)
   */
  getUsers: async (params?: UserSearchParams): Promise<PageResponse<AdminUser>> => {
    const response = await apiClient.get<PageResponse<AdminUser>>(
      '/admin/users',
      { params }
    )
    return response.data
  },

  /**
   * 사용자 정보 수정 (역할 변경 등)
   */
  updateUser: async (id: number, data: { role?: string }): Promise<void> => {
    await apiClient.patch(`/admin/users/${id}`, data)
  },

  /**
   * 사용자 삭제 (미니어처 연쇄 삭제)
   */
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/users/${id}`)
  },
}
