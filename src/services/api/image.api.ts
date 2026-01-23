import axios from 'axios'
import { apiClient } from './client'
import type { PresignRequest, PresignResponse, ImageCreateRequest, ImageResponse } from '@/types'

/**
 * 이미지 관련 API
 */
export const imageApi = {
  /**
   * Presigned URL 발급
   */
  getPresignedUrl: async (data: PresignRequest): Promise<PresignResponse> => {
    const response = await apiClient.post<PresignResponse>('/images/presign', data)
    return response.data
  },

  /**
   * 이미지 메타데이터 저장
   */
  saveMetadata: async (data: ImageCreateRequest): Promise<ImageResponse> => {
    const response = await apiClient.post<ImageResponse>('/images', data)
    return response.data
  },

  /**
   * R2에 이미지 업로드
   * Presigned URL을 사용하여 직접 R2에 업로드
   */
  uploadToR2: async (presignedUrl: string, file: File): Promise<void> => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
  },

  /**
   * 이미지 업로드 헬퍼
   * Presigned URL 발급 -> R2 업로드 -> 메타데이터 저장을 한번에 처리
   */
  upload: async (file: File): Promise<ImageResponse> => {
    // 1. Presigned URL 발급
    const presign = await imageApi.getPresignedUrl({
      filename: file.name,
      contentType: file.type,
    })

    // 2. R2에 업로드
    await imageApi.uploadToR2(presign.presignedUrl, file)

    // 3. 메타데이터 저장
    const image = await imageApi.saveMetadata({
      objectKey: presign.objectKey,
      filename: file.name,
      contentType: file.type,
      size: file.size,
    })

    return image
  },
}
