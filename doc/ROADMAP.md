# SinTower - 죄악의 탑 (프론트엔드) 로드맵

## 프로젝트 개요

미니어처 도색 백로그 추적 서비스의 프론트엔드 애플리케이션입니다.
사용자가 개인 미니어처 도색 백로그를 시각적으로 관리하고, 진행 상황을 공유할 수 있는 서비스를 제공합니다.

### 핵심 기능
- 개인 백로그 관리 (미니어처 등록, 진행 상태 추적)
- 진행 로그 작성 및 이미지 업로드
- 공개 게시판을 통한 진행 공유

---

## 현재 진행률: 15%

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite 7 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 상태 관리 | Zustand |
| 라우팅 | React Router v7 |
| HTTP 클라이언트 | Axios |
| 배포 | Cloudflare Pages |

---

## Phase 1: 프로젝트 기반 구축 (Foundation) ✅ 완료

### 완료된 항목
- [x] Vite + React 프로젝트 초기화
- [x] ESLint 설정
- [x] 기본 프로젝트 구조 생성
- [x] TypeScript 도입 및 설정
- [x] 라우팅 설정 (React Router v7)
- [x] 전역 상태 관리 설정 (Zustand)
- [x] API 클라이언트 설정 (Axios + 인터셉터)
- [x] 환경 변수 설정 (.env)
- [x] 기본 레이아웃 컴포넌트 구성 (Header, Footer, MainLayout)
- [x] CSS 프레임워크 도입 (Tailwind CSS v4)
- [x] 공통 UI 컴포넌트 라이브러리 구축 (Button, Input, Card, Spinner)
- [x] 기본 페이지 구현 (HomePage, NotFoundPage)
- [x] ProtectedRoute 컴포넌트 구현

### Phase 1 구현 내용 요약

#### 프로젝트 구조
```
src/
├── components/
│   ├── common/      # Button, Input, Card, Spinner
│   └── layout/      # Header, Footer, MainLayout
├── hooks/           # 커스텀 훅 (향후 확장)
├── pages/           # Home, NotFound
├── routes/          # router, ProtectedRoute
├── services/api/    # client, auth.api, miniature.api
├── stores/          # authStore, uiStore
├── types/           # auth, miniature, api 타입
└── utils/           # env 유틸리티
```

#### 주요 설정
- TypeScript strict 모드 적용
- 경로 별칭 설정 (@/, @components/, @pages/ 등)
- Cloudflare Pages SPA 라우팅 지원 (_redirects)

---

## Phase 2: 인증 시스템 (Authentication)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 로그인 페이지 UI 구현
- [ ] 회원가입 페이지 UI 구현
- [ ] JWT 토큰 저장 및 관리 로직
- [ ] 인증 상태 전역 관리
- [ ] Protected Route 통합
- [ ] 로그아웃 기능
- [ ] 자동 토큰 갱신 로직
- [ ] 인증 에러 처리 (401 리다이렉트)

---

## Phase 3: 랜딩 페이지 (Landing)

### 완료된 항목
- [x] 랜딩 페이지 기본 레이아웃 (HomePage)
- [x] 서비스 소개 섹션 (히어로 영역)
- [x] 주요 기능 설명 섹션 (3개 카드)
- [x] CTA (Call-to-Action) 버튼

### 진행 예정 항목
- [ ] 반응형 디자인 세부 조정
- [ ] 랜딩 페이지 이미지/일러스트 추가
- [ ] 애니메이션 효과 추가

---

## Phase 4: 개인 백로그 대시보드 (Dashboard)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 대시보드 레이아웃
- [ ] 미니어처 목록 조회 (GET /miniatures)
- [ ] 미니어처 카드 컴포넌트
  - [ ] 제목 표시
  - [ ] 현재 진행 단계 표시
  - [ ] 전체 진행률 시각화
- [ ] 미니어처 추가 모달/폼 (POST /miniatures)
- [ ] 목록 필터링 및 정렬
- [ ] 빈 상태 UI (백로그 없을 때)
- [ ] 로딩 상태 UI
- [ ] 에러 상태 UI

---

## Phase 5: 백로그 상세 페이지 (Detail)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 상세 페이지 레이아웃 (GET /miniatures/{id})
- [ ] 미니어처 정보 표시 섹션
- [ ] 단계별 진행 상태 UI (BacklogItem)
- [ ] 단계 상태 변경 기능 (PATCH /backlog-items/{id})
- [ ] 진행 로그 목록 표시
- [ ] 공개 여부 설정 토글
- [ ] 미니어처 수정 기능
- [ ] 미니어처 삭제 기능

---

## Phase 6: 진행 로그 및 이미지 업로드 (Progress Log)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 진행 로그 작성 폼 (POST /progress-logs)
- [ ] 이미지 업로드 UI
  - [ ] Presigned URL 요청 (POST /images/presign)
  - [ ] R2 직접 업로드 로직
  - [ ] 메타데이터 저장 (POST /images)
- [ ] 이미지 미리보기
- [ ] 다중 이미지 업로드
- [ ] 업로드 진행 상태 표시
- [ ] 로그 공개/비공개 설정
- [ ] 진행 로그 수정/삭제

---

## Phase 7: 공개 게시판 (Public Board)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 공개 게시판 페이지 레이아웃
- [ ] 공개 진행 로그 목록 조회 (GET /public/progress-logs)
- [ ] 게시글 카드 컴포넌트
  - [ ] 썸네일 이미지
  - [ ] 작성자 닉네임
  - [ ] 작성일
- [ ] 무한 스크롤 또는 페이지네이션
- [ ] 게시글 상세 페이지
  - [ ] 작성자 정보
  - [ ] 진행 로그 내용
  - [ ] 첨부 이미지 갤러리
- [ ] SEO 최적화 (메타 태그)

---

## Phase 8: UI/UX 고도화 (Polish)

### 완료된 항목
(없음)

### 진행 예정 항목
- [ ] 전체 반응형 디자인 점검
- [ ] 다크 모드 지원
- [ ] 애니메이션 및 트랜지션
- [ ] 스켈레톤 로딩 UI
- [ ] Toast 알림 시스템
- [ ] 모달 시스템 통합
- [ ] 접근성(a11y) 개선
- [ ] 성능 최적화 (코드 스플리팅, 레이지 로딩)

---

## Phase 9: 배포 및 운영 (Deployment)

### 완료된 항목
- [x] Cloudflare Pages SPA 라우팅 설정 (_redirects)

### 진행 예정 항목
- [ ] Cloudflare Pages 배포 설정
- [ ] CI/CD 파이프라인 구축
- [ ] 환경별 설정 분리 (dev/staging/prod)
- [ ] 에러 모니터링 연동
- [ ] 분석 도구 연동

---

## 향후 확장 기능 (Future)

다음 기능들은 핵심 기능 완료 후 검토 예정입니다:

- [ ] 댓글 기능
- [ ] 좋아요 기능
- [ ] 태그 및 검색 기능
- [ ] 사용자 프로필 페이지
- [ ] 알림 기능
- [ ] 통계 대시보드
- [ ] PWA 지원
- [ ] 다국어 지원

---

## 마일스톤

| 마일스톤 | 목표 기능 | 상태 |
|---------|----------|------|
| M1 - MVP 기반 | Phase 1~2 완료 (프로젝트 설정 + 인증) | Phase 1 완료 |
| M2 - 핵심 기능 | Phase 3~5 완료 (랜딩 + 대시보드 + 상세) | 예정 |
| M3 - 완전 기능 | Phase 6~7 완료 (로그 + 공개 게시판) | 예정 |
| M4 - 정식 출시 | Phase 8~9 완료 (고도화 + 배포) | 예정 |

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-01-23 | 초기 로드맵 작성 |
| 2026-01-23 | Phase 1 완료 - TypeScript, 라우팅, 상태관리, API 클라이언트, Tailwind CSS, 공통 컴포넌트 |

---

## 참고 문서

- [PRD 및 API 명세](/doc/miniature_backlog_prd_and_api.md)
