import type { ImageResponse } from './image.types'

/**
 * 진행 로그 응답
 * API 명세: GET /progress-logs
 */
export interface ProgressLogResponse {
  id: number
  miniatureId: number
  miniatureTitle: string
  userId: number
  userNickname: string
  content: string
  isPublic: boolean
  createdAt: string
  /** 이미지 목록 (백엔드 확장 시 사용) */
  images?: ImageResponse[]
}

/**
 * 진행 로그 생성 요청
 * API 명세: POST /progress-logs
 */
export interface ProgressLogCreateRequest {
  miniatureId: number
  content: string
  isPublic?: boolean
}

/**
 * 진행 로그 수정 요청
 */
export interface ProgressLogUpdateRequest {
  content?: string
  isPublic?: boolean
}
