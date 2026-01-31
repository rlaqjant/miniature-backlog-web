/**
 * 관리자용 미니어처 정보
 */
export interface AdminMiniature {
  id: number
  title: string
  userNickname: string
  isPublic: boolean
  progress: number
  createdAt: string
}

/**
 * 관리자용 사용자 정보
 */
export interface AdminUser {
  id: number
  email: string
  nickname: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  miniatureCount: number
}
