# 백엔드 요청: 이미지 읽기 URL 추가

> 요청일: 2026-01-25

## 배경

현재 이미지 업로드 후 프론트엔드에서 이미지를 표시할 방법이 없습니다.

- `objectKey`만 반환되고, 읽기용 URL이 없음
- R2 버킷이 비공개라 `objectKey`로 직접 접근 불가
- 퍼블릭 버킷 전환 없이 이미지를 표시하려면 읽기용 Presigned URL 필요

---

## 요청 사항

### 1. `ImageResponse`에 `imageUrl` 필드 추가

이미지 응답에 읽기용 Presigned URL을 포함해주세요.

**현재 응답**
```json
{
  "id": 1,
  "progressLogId": 1,
  "objectKey": "users/1/550e8400-e29b-41d4-a716-446655440000_progress_01.jpg",
  "fileName": "progress_01.jpg",
  "contentType": "image/jpeg",
  "createdAt": "2026-01-23T10:00:00"
}
```

**요청 응답**
```json
{
  "id": 1,
  "progressLogId": 1,
  "objectKey": "users/1/550e8400-e29b-41d4-a716-446655440000_progress_01.jpg",
  "imageUrl": "https://r2.cloudflarestorage.com/bucket/users/1/...?X-Amz-Signature=...",
  "fileName": "progress_01.jpg",
  "contentType": "image/jpeg",
  "createdAt": "2026-01-23T10:00:00"
}
```

| 필드 | 타입 | 설명 |
|------|------|------|
| imageUrl | string | 읽기용 Presigned URL (GET 요청 가능) |

---

### 2. 적용 대상 API

`imageUrl` 필드가 포함되어야 하는 API 목록:

| API | 설명 |
|-----|------|
| `POST /images` | 이미지 메타데이터 저장 응답 |
| `GET /progress-logs` | 진행 로그 목록 조회 (images 배열 내) |
| `GET /progress-logs/{id}` | 진행 로그 상세 조회 (있다면) |
| `GET /public/progress-logs` | 공개 게시판 조회 (images 배열 내) |

---

### 3. Presigned URL 설정 권장사항

| 항목 | 권장값 | 설명 |
|------|--------|------|
| HTTP Method | GET | 읽기 전용 |
| 만료 시간 | 1시간 ~ 24시간 | 페이지 체류 시간 고려 |
| 캐싱 | 응답마다 새 URL 생성 | 만료 대응 |

---

## 프론트엔드 변경 계획

백엔드 수정 완료 후 프론트엔드에서 처리할 작업:

### 1. 타입 수정 (`src/types/image.types.ts`)

```typescript
export interface ImageResponse {
  id: number
  progressLogId: number
  objectKey: string
  imageUrl: string        // 추가
  fileName: string
  contentType: string
  createdAt: string
}

// getImageUrl 헬퍼 함수 삭제 (더 이상 불필요)
```

### 2. 컴포넌트 수정 (`src/components/detail/ProgressLogList.tsx`)

```typescript
// 현재: getImageUrl(image.objectKey)
// 수정: image.imageUrl 직접 사용

<img src={image.imageUrl} alt={image.fileName} />
```

---

## 참고: 현재 이미지 업로드 흐름

```
┌─────────────┐  POST /images/presign   ┌─────────────┐
│  Frontend   │ ──────────────────────▶ │   Backend   │
│             │ ◀────────────────────── │             │
│             │   { uploadUrl,          │             │
│             │     objectKey }         │             │
└─────────────┘                         └─────────────┘
       │
       │  PUT uploadUrl (R2 직접 업로드)
       ▼
┌─────────────┐
│     R2      │
└─────────────┘
       │
       │  업로드 완료
       ▼
┌─────────────┐  POST /images           ┌─────────────┐
│  Frontend   │ ──────────────────────▶ │   Backend   │
│             │ ◀────────────────────── │             │
│             │   { id, objectKey,      │             │
│             │     imageUrl, ... }     │  ← 여기에 추가
└─────────────┘                         └─────────────┘
```

---

## 질문 사항

1. Presigned URL 만료 시간을 얼마로 설정할지?
2. 만료된 URL 갱신을 위한 별도 API(`GET /images/{id}/refresh-url`)가 필요한지?
   - 페이지를 오래 열어두면 URL이 만료될 수 있음
   - 필요하다면 추가 요청 예정
