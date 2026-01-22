/**
 * API 에러 응답
 */
export interface ApiError {
  status: number
  message: string
  code?: string
  details?: Record<string, string[]>
}

/**
 * 페이지네이션 응답
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  page?: number
  limit?: number
}
