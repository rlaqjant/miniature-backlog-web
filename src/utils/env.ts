/**
 * 환경 변수 유틸리티
 * Vite 환경 변수에 타입 안전하게 접근
 */
export const env = {
  /** API 기본 URL */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,

  /** 앱 이름 */
  appName: import.meta.env.VITE_APP_NAME || 'PaintLater',

  /** 앱 버전 */
  appVersion: import.meta.env.VITE_APP_VERSION || '0.0.0',

  /** Mock API 활성화 여부 */
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',

  /** 개발 모드 여부 */
  isDev: import.meta.env.DEV,

  /** 프로덕션 모드 여부 */
  isProd: import.meta.env.PROD,
} as const
