# PaintLater 로드맵

## 프로젝트 개요

미니어처 도색 백로그 추적 서비스의 프론트엔드 애플리케이션입니다.
사용자가 개인 미니어처 도색 백로그를 시각적으로 관리하고, 진행 상황을 공유할 수 있는 서비스를 제공합니다.

### 핵심 기능
- 개인 백로그 관리 (미니어처 등록, 진행 상태 추적)
- 진행 로그 작성 및 이미지 업로드
- 로그인 사용자 전용 게시판을 통한 진행 공유

---

## 백엔드 API 연동 현황

| 백엔드 API | 설명 | 프론트엔드 연동 | Phase |
|-----------|------|---------------|-------|
| `POST /auth/register` | 회원가입 | ✅ 완료 | Phase 2 |
| `POST /auth/login` | 로그인 | ✅ 완료 | Phase 2 |
| `POST /auth/logout` | 로그아웃 | ✅ 완료 | Phase 2 |
| `POST /auth/refresh` | 토큰 갱신 | ✅ 완료 | Phase 2 |
| `GET /miniatures` | 백로그 목록 조회 | ✅ 완료 | Phase 4 |
| `POST /miniatures` | 백로그 생성 | ✅ 완료 | Phase 4 |
| `GET /miniatures/{id}` | 백로그 상세 조회 | ✅ 완료 | Phase 5 |
| `PATCH /backlog-items/{id}` | 단계 상태 변경 | ✅ 완료 | Phase 5 |
| `POST /progress-logs` | 진행 로그 작성 | ✅ 완료 | Phase 6 |
| `GET /progress-logs` | 내 진행 로그 목록 | ✅ 완료 | Phase 5 |
| `GET /public/progress-logs` | 게시판 조회 (인증 필요) | ✅ 완료 | Phase 7 |
| `POST /images/presign` | presigned URL 발급 | ✅ 완료 | Phase 6 |
| `POST /images` | 이미지 메타데이터 저장 | ✅ 완료 | Phase 6 |

---

## 현재 진행률: 82%

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

#### API 명세 기반 타입/서비스 레이어 (2026-01-24 추가)
- `ApiResponse<T>`, `PageResponse<T>`, `ApiError` 구조 명세 일치
- `BacklogItemStatus` 'NOT_STARTED' -> 'TODO' 변경
- ID 타입 `string` -> `number` 변경 (Miniature, BacklogItem, User)
- API 클라이언트 `ApiResponse` 래퍼 처리, 에러 코드(E2002/E2003) 구분
- 신규 타입 파일: `progressLog.types.ts`, `image.types.ts`
- 신규 API 서비스: `backlogItem.api.ts`, `progressLog.api.ts`, `image.api.ts`

---

## Phase 2: 인증 시스템 (Authentication) ✅ 완료

### 완료된 항목
- [x] 로그인 페이지 UI 구현
- [x] 회원가입 페이지 UI 구현
- [x] JWT 토큰 관리 (httpOnly 쿠키 방식)
- [x] 인증 상태 전역 관리
- [x] Protected Route 통합
- [x] GuestRoute 구현 (로그인 사용자 리다이렉트)
- [x] 로그아웃 기능 (서버 API 연동)
- [x] 자동 토큰 갱신 로직 (401 시 토큰 갱신 후 재요청)
- [x] 인증 에러 처리 (401 리다이렉트)
- [x] useAuth 커스텀 훅 구현

### Phase 2 구현 내용 요약

#### 생성된 파일
```
src/
├── components/
│   └── auth/
│       └── AuthInitializer.tsx  # 앱 시작 시 토큰 검증
├── pages/Auth/
│   ├── LoginPage.tsx      # 로그인 페이지
│   ├── RegisterPage.tsx   # 회원가입 페이지
│   └── index.ts
├── hooks/
│   ├── useAuth.ts         # 인증 관련 커스텀 훅
│   └── index.ts
└── routes/
    └── GuestRoute.tsx     # 비로그인 사용자 전용 라우트
```

#### 주요 기능
- 로그인/회원가입 폼 유효성 검사
- 비밀번호 확인 일치 여부 검증
- 로그인 후 원래 페이지로 리다이렉트
- JWT 토큰 httpOnly 쿠키 방식 (XSS 방어, localStorage 미사용)
- 자동 토큰 갱신 (대기열 패턴 적용, withCredentials: true)
- user 정보만 localStorage 영속화 (토큰은 쿠키로 관리)
- AuthInitializer를 통한 앱 시작 시 쿠키 유효성 검증
- 로그아웃 시 서버 API 호출로 쿠키 삭제

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

## Phase 4: 개인 백로그 대시보드 (Dashboard) ✅ 완료

### 사용 API
- `GET /miniatures` - 내 백로그 목록 조회
- `POST /miniatures` - 새 백로그 생성

### API 연동 작업
- [x] `miniatureApi.getList()` 연동 확인
- [x] `miniatureApi.create()` 연동 확인

### 완료된 항목
- [x] 대시보드 레이아웃
- [x] 미니어처 목록 조회 (GET /miniatures)
- [x] 미니어처 카드 컴포넌트
  - [x] 제목 표시
  - [x] 현재 진행 단계 표시 (상태 배지)
  - [x] 전체 진행률 시각화 (ProgressBar)
- [x] 미니어처 추가 모달/폼 (POST /miniatures)
- [x] 목록 필터링 및 정렬 (DashboardFilter)
- [x] 빈 상태 UI (EmptyState)
- [x] 로딩 상태 UI (Spinner)
- [x] 에러 상태 UI (재시도 버튼 포함)

### Phase 4 구현 내용 요약

#### 생성된 파일
```
src/
├── components/
│   ├── common/
│   │   ├── Modal/         # 포털 기반 모달 (ESC/배경 클릭 닫기)
│   │   ├── Textarea/      # 텍스트에어리어 컴포넌트
│   │   └── Select/        # 셀렉트 드롭다운 컴포넌트
│   └── dashboard/
│       ├── ProgressBar/   # 진행률 시각화
│       ├── EmptyState/    # 빈 상태 UI
│       ├── MiniatureCard/ # 백로그 카드
│       ├── MiniatureList/ # 목록 컴포넌트 (로딩/에러/빈상태 분기)
│       ├── DashboardFilter/ # 필터/정렬 드롭다운
│       └── AddMiniatureModal/ # 백로그 추가 모달
├── hooks/
│   └── useMiniatures.ts   # 백로그 목록 관리 훅
└── pages/
    └── Dashboard/
        └── DashboardPage.tsx  # 대시보드 메인 페이지
```

#### 주요 기능
- useMiniatures 훅으로 API 호출/상태 관리 분리
- 필터링: 전체/시작 전/진행 중/완료
- 정렬: 최근 수정순/생성일순/이름순/진행률순
- 반응형 그리드: 1열(모바일) → 2열(태블릿) → 3~4열(데스크탑)

### 진행 예정 항목
(없음)

---

## Phase 5: 백로그 상세 페이지 (Detail) ✅ 완료

### 사용 API
- `GET /miniatures/{id}` - 백로그 상세 조회
- `PATCH /backlog-items/{id}` - 단계 상태 변경
- `GET /progress-logs?miniatureId={id}` - 해당 미니어처의 진행 로그

### API 연동 작업
- [x] `backlogItemApi.ts` 신규 생성
- [x] `progressLogApi.ts` 신규 생성
- [x] `BacklogItem` 타입 필드명 수정 (name→stepName, order→orderIndex)
- [x] `progressLogApi` 엔드포인트 수정 (API 명세 기준)

### 완료된 항목
- [x] 상세 페이지 레이아웃 (GET /miniatures/{id})
- [x] 미니어처 정보 표시 섹션 (MiniatureInfo)
- [x] 단계별 진행 상태 UI (BacklogSteps)
- [x] 단계 상태 변경 기능 (PATCH /backlog-items/{id})
- [x] 진행 로그 목록 표시 (ProgressLogList)
- [x] 공개 여부 설정 토글
- [x] 미니어처 수정 기능 (EditMiniatureModal)
- [x] 미니어처 삭제 기능 (DeleteConfirmModal)

### Phase 5 구현 내용 요약

#### 생성된 파일
```
src/
├── components/
│   └── detail/
│       ├── MiniatureInfo.tsx      # 기본 정보 + 공개 토글 + 수정/삭제 버튼
│       ├── BacklogSteps.tsx       # 5단계 백로그 상태 관리 (TODO→IN_PROGRESS→DONE)
│       ├── ProgressLogList.tsx    # 진행 로그 타임라인 표시
│       ├── EditMiniatureModal.tsx # 제목/설명 수정 모달
│       ├── DeleteConfirmModal.tsx # 삭제 확인 모달
│       └── index.ts
├── hooks/
│   └── useMiniatureDetail.ts      # 상세 조회, 상태 변경, 수정, 삭제 훅
└── pages/
    └── Detail/
        ├── MiniatureDetailPage.tsx # 상세 페이지
        └── index.ts
```

#### 주요 기능
- useMiniatureDetail 훅으로 API 호출/상태 관리 분리
- 백로그 단계 클릭 시 상태 순환 (TODO → IN_PROGRESS → DONE → TODO)
- 공개/비공개 토글 스위치
- 수정/삭제 모달 (포털 기반)
- 진행 로그 타임라인 UI
- 뒤로가기 네비게이션

#### 라우트 추가
- `/miniatures/:id` - 상세 페이지 (ProtectedRoute)

### 진행 예정 항목
(없음)

---

## Phase 6: 진행 로그 및 이미지 업로드 (Progress Log) ✅ 완료

### 사용 API
- `POST /progress-logs` - 진행 로그 작성
- `POST /images/presign` - presigned URL 발급
- `POST /images` - 이미지 메타데이터 저장

### API 연동 작업
- [x] `imageApi.ts` 신규 생성
- [x] R2 직접 업로드 로직 구현
- [x] 타입 수정 (API 스펙 일치: fileName, uploadUrl, progressLogId)

### 완료된 항목
- [x] 진행 로그 작성 폼 (POST /progress-logs)
- [x] 이미지 업로드 UI (ImageUploader)
  - [x] Presigned URL 요청 (POST /images/presign)
  - [x] R2 직접 업로드 로직 (uploadWithProgress)
  - [x] 메타데이터 저장 (POST /images)
- [x] 이미지 미리보기 (로컬 URL)
- [x] 다중 이미지 업로드 (최대 5장)
- [x] 드래그 앤 드롭 지원
- [x] 업로드 진행 상태 표시
- [x] 로그 공개/비공개 설정
- [x] 진행 로그 삭제

### Phase 6 구현 내용 요약

#### 생성/수정된 파일
```
src/
├── types/
│   └── image.types.ts          # API 스펙 일치 타입 수정
├── services/api/
│   └── image.api.ts            # uploadWithProgress 메서드 추가
├── components/
│   ├── common/
│   │   └── ImageUploader/      # 이미지 업로드 컴포넌트 (드래그앤드롭, 미리보기)
│   └── detail/
│       ├── AddProgressLogModal.tsx  # 진행 로그 작성 모달
│       └── ProgressLogList.tsx      # 추가/삭제 버튼 추가
├── hooks/
│   └── useMiniatureDetail.ts   # createProgressLog, deleteProgressLog 메서드 추가
└── pages/
    └── Detail/
        └── MiniatureDetailPage.tsx  # 모달 상태 관리 통합
```

#### 주요 기능
- 진행 로그 생성 시 이미지 첨부 (선택)
- Presigned URL 기반 R2 직접 업로드 (백엔드 경유 없음)
- 업로드 진행률 실시간 표시
- 개별 이미지 업로드 실패 시 건너뛰기 (부분 성공 허용)
- 이미지 드래그 앤 드롭 + 클릭 선택
- 로컬 미리보기 (URL.createObjectURL)
- 본인 로그만 삭제 가능 (userId 확인)

### 진행 예정 항목
- [ ] 진행 로그 수정 기능

---

## Phase 7: 게시판 (Board) ✅ 완료

### 사용 API
- `GET /public/progress-logs?page=0&size=12` - 게시판 조회 (페이지네이션, 인증 필요)

### API 연동 작업
- [x] `progressLogApi.getPublic(params)` 구현

### 완료된 항목
- [x] 게시판 페이지 레이아웃 (/board)
- [x] 공개 진행 로그 목록 조회 (GET /public/progress-logs)
- [x] 게시글 카드 컴포넌트 (PublicLogCard)
  - [x] 썸네일 이미지 (4:3 비율, lazy loading)
  - [x] 작성자 닉네임
  - [x] 상대 시간 표시 (date-fns)
  - [x] 미니어처 제목
  - [x] 내용 미리보기 (2줄 말줄임)
  - [x] 이미지 개수 배지
  - [x] 이미지 onError 핸들러 (ORB 차단 대응)
- [x] 페이지네이션 (Pagination 공통 컴포넌트)
  - [x] 이전/다음 버튼
  - [x] 페이지 번호 표시 (최대 5개)
  - [x] 말줄임(...) 처리
  - [x] 접근성 aria 속성
- [x] 게시글 상세 모달 (PublicLogDetailModal)
  - [x] 작성자 정보 (닉네임 + 상대 시간)
  - [x] 진행 로그 내용
  - [x] 첨부 이미지 갤러리 (그리드 레이아웃)
  - [x] 이미지 라이트박스 (yet-another-react-lightbox)
- [x] usePublicBoard 커스텀 훅 (페이지네이션/로딩/에러 상태 관리)
- [x] 로딩/에러/빈 상태 UI
- [x] 반응형 카드 그리드 (1열 -> 2열 -> 3열)
- [x] 게시판 접근 제어 변경: 로그인 사용자 전용으로 전환
  - [x] 프론트엔드: /board 라우트를 ProtectedRoute 하위로 이동
  - [x] 프론트엔드: 헤더의 게시판 링크를 isAuthenticated 조건으로 감싸기
  - [x] 백엔드: SecurityConfig에서 /public/** permitAll 제거
  - [x] 백엔드: PublicProgressLogController 주석 업데이트

### Phase 7 구현 내용 요약

#### 생성/수정된 파일
```
src/
├── components/
│   ├── board/
│   │   ├── PublicLogCard.tsx         # 게시판 로그 카드 (썸네일, 작성자, 시간)
│   │   └── PublicLogDetailModal.tsx  # 상세 모달 (라이트박스 포함)
│   └── common/
│       └── Pagination/
│           ├── Pagination.tsx        # 공통 페이지네이션 컴포넌트
│           └── index.ts
├── hooks/
│   └── usePublicBoard.ts            # 게시판 데이터 훅
├── pages/
│   └── Board/
│       ├── PublicBoardPage.tsx       # 게시판 페이지
│       └── index.ts
└── routes/
    └── router.tsx                   # /board 라우트 (ProtectedRoute 하위)

package.json                          # date-fns, yet-another-react-lightbox 의존성 추가
```

#### 주요 기능
- 로그인 사용자만 접근 가능한 보호된 라우트 (/board)
- 비로그인 사용자는 헤더에서 게시판 링크가 숨겨짐
- usePublicBoard 훅으로 API 호출/페이지네이션 상태 관리 분리
- 카드 클릭 시 상세 모달 표시 (별도 페이지 이동 없이)
- 이미지 클릭 시 라이트박스로 전체 크기 표시
- 이미지 로드 실패 시 깨진 이미지 대신 숨김 처리 (OpaqueResponseBlocking 대응)
- date-fns 한국어 로케일 기반 상대 시간 표시 ("3분 전", "2시간 전" 등)

#### 라우트 변경
- `/board` - 게시판 (인증 필요, ProtectedRoute 하위)

#### 접근 정책 변경 (2026-01-27)
- 변경 전: 비로그인 사용자도 접근 가능한 공개 라우트
- 변경 후: 로그인 사용자만 접근 가능한 보호된 라우트
- 변경 사유: 서비스 초기 단계에서 인증된 사용자 중심의 커뮤니티 운영
- 백엔드: SecurityConfig에서 /public/** 엔드포인트의 permitAll 제거

### 진행 예정 항목
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
- [x] 정식 도메인 기반 API 통신 설정
  - API 프록시 제거, 직접 도메인 사용으로 전환

### 진행 예정 항목
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
| M1 - MVP 기반 | Phase 1~2 완료 (프로젝트 설정 + 인증) | ✅ 완료 |
| M2 - 핵심 기능 | Phase 3~5 완료 (랜딩 + 대시보드 + 상세) | ✅ 완료 |
| M3 - 완전 기능 | Phase 6~7 완료 (로그 + 공개 게시판) | ✅ 완료 |
| M4 - 정식 출시 | Phase 8~9 완료 (고도화 + 배포) | 예정 |

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-01-23 | 초기 로드맵 작성 |
| 2026-01-23 | Phase 1 완료 - TypeScript, 라우팅, 상태관리, API 클라이언트, Tailwind CSS, 공통 컴포넌트 |
| 2026-01-23 | Phase 2 완료 - 로그인/회원가입 UI, JWT 토큰 관리, 자동 갱신, useAuth 훅 |
| 2026-01-23 | 백엔드 API 연동 현황 추가, Phase 4~7 API 매핑 추가 |
| 2026-01-23 | Phase 4 완료 - 대시보드, 백로그 목록/추가, 필터/정렬, 상태 UI |
| 2026-01-24 | API 명세 기반 타입/서비스 레이어 전면 수정 - ApiResponse 구조, ID 타입, 상태값 변경, 신규 API 서비스(backlogItem, progressLog, image) 추가, AuthInitializer 컴포넌트 추가 |
| 2026-01-24 | Phase 5 완료 - 백로그 상세 페이지, 단계 상태 관리, 진행 로그 목록, 수정/삭제 기능, progressLog API 엔드포인트 수정 |
| 2026-01-25 | JWT 토큰 저장 방식 변경 - localStorage에서 httpOnly 쿠키로 전환, logout API 연동, 보안 강화 |
| 2026-01-25 | Phase 6 완료 - 진행 로그 작성, 이미지 업로드 (Presigned URL + R2 직접 업로드), 드래그앤드롭, 로그 삭제 기능 |
| 2026-01-25 | 이미지 URL 처리 개선 - 백엔드 응답의 imageUrl 필드 직접 사용, getImageUrl 헬퍼 삭제 |
| 2026-01-26 | Cloudflare Pages Functions API 프록시 추가 - iOS Safari 크로스 사이트 쿠키 문제 해결 |
| 2026-01-26 | API 프록시 제거 - 정식 도메인 사용으로 전환 |
| 2026-01-27 | Phase 7 완료 - 공개 게시판 페이지(/board), 카드 그리드, 상세 모달, 라이트박스, 페이지네이션 공통 컴포넌트, 이미지 ORB 차단 대응, date-fns/yet-another-react-lightbox 의존성 추가 |
| 2026-01-27 | M3 마일스톤 완료 - 핵심 기능 전체 구현 (백로그 관리 + 진행 로그 + 이미지 업로드 + 공개 게시판) |
| 2026-01-27 | 게시판 접근 정책 변경 - 공개 게시판을 로그인 사용자 전용으로 전환 (프론트엔드: /board를 ProtectedRoute 하위로 이동, 헤더 링크 인증 조건 추가 / 백엔드: SecurityConfig /public/** permitAll 제거) |

---

## 참고 문서

- [PRD 및 API 명세](/doc/miniature_backlog_prd_and_api.md)
