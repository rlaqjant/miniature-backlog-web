/**
 * 사용자 정보
 */
export interface User {
  id: string
  email: string
  nickname: string
  createdAt: string
}

/**
 * 인증 토큰
 */
export interface AuthTokens {
  accessToken: string
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
 */
export interface LoginResponse {
  accessToken: string
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
