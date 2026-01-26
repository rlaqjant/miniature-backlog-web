# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어

- 응답, 코드 주석, 커밋 메시지, 문서화: 한국어
- 변수명/함수명: 영어

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (http://localhost:5173)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
npm run preview  # 빌드 결과 미리보기
```

## 아키텍처

**PaintLater** - 미니어처 도색 백로그 추적 서비스 프론트엔드

### 기술 스택
- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (Vite 플러그인)
- Zustand (상태관리, localStorage 영속화)
- React Router v7
- Axios (JWT 자동 첨부, 토큰 갱신 인터셉터)

### 경로 별칭
```
@/*           → src/*
@components/* → src/components/*
@pages/*      → src/pages/*
@hooks/*      → src/hooks/*
@services/*   → src/services/*
@stores/*     → src/stores/*
@types/*      → src/types/*
@utils/*      → src/utils/*
```

### 핵심 모듈

**인증 흐름**
- `stores/authStore.ts`: JWT 토큰과 사용자 정보 관리, localStorage 영속화
- `services/api/client.ts`: Axios 인터셉터 - 토큰 자동 첨부, 401시 토큰 갱신 (대기열 패턴)
- `routes/ProtectedRoute.tsx`: 인증 필요 라우트 보호
- `routes/GuestRoute.tsx`: 비로그인 사용자 전용 (로그인/회원가입)

**API 클라이언트**
- Base URL: `VITE_API_BASE_URL` 환경변수
- 모든 API 호출은 `services/api/` 디렉토리에서 관리

### 환경 변수
```
VITE_API_BASE_URL   # API 서버 URL (기본: http://localhost:8080)
VITE_APP_NAME       # 앱 이름
VITE_ENABLE_MOCK_API # Mock API 활성화 여부
```

## 로드맵

개발 진행 상황은 `doc/ROADMAP.md` 참조 (루트가 아닌 doc/ 경로)
