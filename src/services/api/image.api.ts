import axios from 'axios'
import { apiClient } from './client'
import type {
  PresignRequest,
  PresignResponse,
  ImageCreateRequest,
  ImageResponse,
} from '@/types'

/**
 * 업로드 진행률 콜백 타입
 */
type UploadProgressCallback = (percent: number) => void

/**
 * 이미지 관련 API
 */
export const imageApi = {
  /**
   * Presigned URL 발급
   * POST /images/presign
   */
  getPresignedUrl: async (data: PresignRequest): Promise<PresignResponse> => {
    const response = await apiClient.post<PresignResponse>('/images/presign', data)
    return response.data
  },

  /**
   * 이미지 메타데이터 저장
   * POST /images
   */
  saveMetadata: async (data: ImageCreateRequest): Promise<ImageResponse> => {
    const response = await apiClient.post<ImageResponse>('/images', data)
    return response.data
  },

  /**
   * R2에 이미지 업로드
   * Presigned URL을 사용하여 직접 R2에 업로드
   */
  uploadToR2: async (
    uploadUrl: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<void> => {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percent)
        }
      },
    })
  },

  /**
   * 이미지 업로드 (진행률 포함)
   * Presigned URL 발급 -> R2 업로드 -> 메타데이터 저장을 한번에 처리
   * @param file 업로드할 파일
   * @param progressLogId 연결할 진행 로그 ID
   * @param onProgress 업로드 진행률 콜백
   */
  uploadWithProgress: async (
    file: File,
    progressLogId: number,
    onProgress?: UploadProgressCallback
  ): Promise<ImageResponse> => {
    // contentType 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('지원하지 않는 이미지 형식입니다. (jpeg, png, gif, webp만 허용)')
    }

    // 1. Presigned URL 발급
    let presign: PresignResponse
    try {
      presign = await imageApi.getPresignedUrl({
        fileName: file.name,
        contentType: file.type as PresignRequest['contentType'],
      })
    } catch (err) {
      // 백엔드 에러 메시지 추출
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        const apiError = err.response.data.error
        throw new Error(apiError.detail || apiError.message || '이미지 업로드 준비에 실패했습니다')
      }
      throw err
    }

    // 2. R2에 업로드 (진행률 추적)
    await imageApi.uploadToR2(presign.uploadUrl, file, onProgress)

    // 3. 메타데이터 저장
    const image = await imageApi.saveMetadata({
      progressLogId,
      objectKey: presign.objectKey,
    })

    return image
  },
}
