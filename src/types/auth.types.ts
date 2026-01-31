/**
 * 사용자 정보
 */
export interface User {
  id: number
  email: string
  nickname: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답
 * 토큰은 httpOnly 쿠키로 전달됨
 * 참고: API 명세상 user 정보는 응답에 포함되지 않음
 */
export interface LoginResponse {
  user?: User
}

/**
 * 회원가입 요청
 */
export interface RegisterRequest {
  email: string
  password: string
  nickname: string
}
