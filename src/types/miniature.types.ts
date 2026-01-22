/**
 * 백로그 아이템 상태
 */
export type BacklogItemStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE'

/**
 * 미니어처(백로그) 기본 정보
 */
export interface Miniature {
  id: string
  title: string
  isPublic: boolean
  progress: number
  createdAt: string
  updatedAt: string
}

/**
 * 백로그 아이템 (단계별 진행 상태)
 */
export interface BacklogItem {
  id: string
  name: string
  order: number
  status: BacklogItemStatus
}

/**
 * 진행 로그
 */
export interface ProgressLog {
  id: string
  content: string
  isPublic: boolean
  createdAt: string
  images: Image[]
}

/**
 * 이미지 정보
 */
export interface Image {
  id: string
  url: string
  objectKey: string
}

/**
 * 미니어처 상세 정보
 */
export interface MiniatureDetail extends Miniature {
  description: string
  backlogItems: BacklogItem[]
  progressLogs: ProgressLog[]
}

/**
 * 미니어처 생성 요청
 */
export interface CreateMiniatureRequest {
  title: string
  description?: string
}

/**
 * 미니어처 수정 요청
 */
export interface UpdateMiniatureRequest {
  title?: string
  description?: string
  isPublic?: boolean
}
