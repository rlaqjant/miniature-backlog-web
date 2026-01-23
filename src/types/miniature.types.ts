/**
 * 백로그 아이템 상태
 */
export type BacklogItemStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

/**
 * 미니어처(백로그) 기본 정보
 */
export interface Miniature {
  id: number
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
  id: number
  stepName: string
  orderIndex: number
  status: BacklogItemStatus
  progress?: number
}

/**
 * 미니어처 상세 정보
 */
export interface MiniatureDetail extends Miniature {
  description: string
  backlogItems: BacklogItem[]
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

/**
 * 백로그 아이템 상태 수정 요청
 */
export interface UpdateBacklogItemRequest {
  status: BacklogItemStatus
}
