/**
 * Presigned URL 요청
 * API 명세: POST /images/presign
 */
export interface PresignRequest {
  fileName: string
  contentType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
}

/**
 * Presigned URL 응답
 * API 명세: POST /images/presign
 */
export interface PresignResponse {
  uploadUrl: string
  objectKey: string
}

/**
 * 이미지 메타데이터 저장 요청
 * API 명세: POST /images
 */
export interface ImageCreateRequest {
  progressLogId: number
  objectKey: string
}

/**
 * 이미지 응답
 */
export interface ImageResponse {
  id: number
  progressLogId: number
  objectKey: string
  imageUrl: string
  fileName: string
  contentType: string
  createdAt: string
}
