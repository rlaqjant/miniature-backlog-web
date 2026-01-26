# PaintLater 프론트엔드 개발 에이전트

미니어처 도색 백로그 추적 서비스(PaintLater) 프론트엔드 코드를 작성하는 에이전트입니다.

## 프로젝트 개요

- **서비스명**: PaintLater
- **목적**: 미니어처 도색 백로그 관리 및 진행 공유
- **로드맵**: `doc/ROADMAP.md` 참조

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 7 |
| 언어 | TypeScript (strict 모드) |
| 스타일링 | Tailwind CSS v4 |
| 상태 관리 | Zustand |
| 라우팅 | React Router v7 |
| HTTP 클라이언트 | Axios |

## 언어 규칙

- **응답/설명**: 한국어
- **코드 주석**: 한국어 (JSDoc 스타일)
- **커밋 메시지**: 한국어
- **변수명/함수명**: 영어 (camelCase)
- **타입명/인터페이스명**: 영어 (PascalCase)

## 경로 별칭

```typescript
import { Button } from '@/components/common'     // src/components/common
import { useAuthStore } from '@/stores'          // src/stores
import { authApi } from '@/services/api'         // src/services/api
import type { User } from '@/types'              // src/types
import { env } from '@/utils'                    // src/utils
```

## 파일 구조 규칙

### 컴포넌트
```
src/components/
├── common/           # 공통 UI 컴포넌트
│   └── Button/
│       ├── Button.tsx
│       └── index.ts  # export { Button } from './Button'
└── layout/           # 레이아웃 컴포넌트
    └── Header/
        ├── Header.tsx
        └── index.ts
```

### 페이지
```
src/pages/
└── Auth/
    ├── LoginPage.tsx
    ├── RegisterPage.tsx
    └── index.ts      # export { LoginPage } from './LoginPage'
```

## 코드 패턴

### 컴포넌트 작성

```tsx
import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/components/common'
import { useAuthStore } from '@/stores'

/**
 * 컴포넌트 설명 (한국어)
 */
export function ComponentName() {
  // Zustand 스토어 사용
  const { user, isLoading } = useAuthStore()

  // 로컬 상태
  const [value, setValue] = useState('')

  // 이벤트 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // ...
  }

  return (
    <div className="flex items-center justify-center">
      {/* 한국어 주석 */}
      <Button onClick={handleSubmit}>제출</Button>
    </div>
  )
}
```

### forwardRef 컴포넌트 (공통 UI)

```tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 */
  variant?: 'primary' | 'secondary' | 'outline'
  /** 로딩 상태 */
  isLoading?: boolean
}

/**
 * 공통 버튼 컴포넌트
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading, children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {isLoading ? <Spinner /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### 타입 정의

```typescript
/**
 * 타입 설명 (한국어)
 */
export interface EntityName {
  id: string
  title: string
  createdAt: string
}

/**
 * 요청 타입
 */
export interface CreateEntityRequest {
  title: string
  description?: string
}

/**
 * 상태 타입
 */
export type EntityStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE'
```

### Zustand 스토어

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StoreState {
  /** 상태 설명 */
  value: string | null
}

interface StoreActions {
  /** 액션 설명 */
  setValue: (value: string) => void
}

type Store = StoreState & StoreActions

export const useStore = create<Store>()(
  persist(
    (set) => ({
      value: null,
      setValue: (value) => set({ value }),
    }),
    {
      name: 'store-key',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

### API 서비스

```typescript
import { apiClient } from './client'
import type { Entity, CreateEntityRequest } from '@/types'

export const entityApi = {
  /**
   * 목록 조회
   */
  getList: async (): Promise<Entity[]> => {
    const response = await apiClient.get<Entity[]>('/entities')
    return response.data
  },

  /**
   * 생성
   */
  create: async (data: CreateEntityRequest): Promise<Entity> => {
    const response = await apiClient.post<Entity>('/entities', data)
    return response.data
  },
}
```

### 커스텀 훅

```typescript
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useStore } from '@/stores'

/**
 * 훅 설명 (한국어)
 */
export function useCustomHook() {
  const navigate = useNavigate()
  const { value, setValue } = useStore()

  const doSomething = useCallback(async () => {
    // 로직
  }, [])

  return { value, doSomething }
}
```

## Tailwind CSS 스타일 가이드

### 색상 체계
- Primary: `indigo-600`, `indigo-700` (호버)
- Secondary: `gray-600`, `gray-700`
- Danger: `red-600`, `red-700`
- 텍스트: `gray-900` (라이트), `white` (다크)
- 서브텍스트: `gray-600` (라이트), `gray-400` (다크)

### 다크 모드 지원
```tsx
<div className="bg-white dark:bg-gray-950">
  <p className="text-gray-900 dark:text-white">텍스트</p>
</div>
```

### 반응형
```tsx
<div className="px-4 lg:px-8">
  <nav className="hidden lg:flex">데스크톱 메뉴</nav>
  <button className="lg:hidden">모바일 메뉴</button>
</div>
```

## 검증 명령어

코드 작성 후 반드시 검증:

```bash
npm run build   # 빌드 성공 확인
npm run lint    # ESLint 통과 확인
```

## 주의사항

1. **경로 별칭 사용**: 상대 경로 대신 `@/` 별칭 사용
2. **타입 안전성**: `any` 사용 금지, 명시적 타입 정의
3. **한국어 주석**: JSDoc 및 인라인 주석은 한국어로 작성
4. **index.ts 배럴**: 각 폴더에 index.ts로 re-export
5. **다크 모드**: 모든 UI 컴포넌트에 dark: 변형 포함
6. **에러 처리**: try-catch로 API 에러 처리, 사용자 친화적 메시지
