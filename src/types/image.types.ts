/**
 * Presigned URL 요청
 */
export interface PresignRequest {
  filename: string
  contentType: string
}

/**
 * Presigned URL 응답
 */
export interface PresignResponse {
  presignedUrl: string
  objectKey: string
  expiresIn: number
}

/**
 * 이미지 메타데이터 저장 요청
 */
export interface ImageCreateRequest {
  objectKey: string
  filename: string
  contentType: string
  size: number
}

/**
 * 이미지 응답
 */
export interface ImageResponse {
  id: number
  url: string
  objectKey: string
  filename: string
  contentType: string
  size: number
  createdAt: string
}
