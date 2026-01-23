import type { ImageResponse } from './image.types'

/**
 * 진행 로그 응답
 */
export interface ProgressLogResponse {
  id: number
  miniatureId: number
  content: string
  isPublic: boolean
  createdAt: string
  images: ImageResponse[]
}

/**
 * 진행 로그 생성 요청
 */
export interface ProgressLogCreateRequest {
  content: string
  isPublic?: boolean
  imageIds?: number[]
}

/**
 * 진행 로그 수정 요청
 */
export interface ProgressLogUpdateRequest {
  content?: string
  isPublic?: boolean
}
