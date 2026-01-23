/**
 * API 응답 래퍼
 */
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: ApiError
  timestamp: string
}

/**
 * API 에러 응답
 */
export interface ApiError {
  code: string
  message: string
  detail?: string
}

/**
 * 페이지네이션 응답
 */
export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

/**
 * 페이지네이션 요청 파라미터
 */
export interface PaginationParams {
  page?: number
  size?: number
}
