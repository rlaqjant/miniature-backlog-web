# Phase 6: 이미지 업로드 (Image) 작업 요약

## 개요
Cloudflare R2 연동을 통한 이미지 업로드 기능 구현. 클라이언트가 Presigned URL을 통해 R2에 직접 업로드하고, 메타데이터만 백엔드에 저장하는 방식입니다.

---

## 생성된 파일 (9개)

| 파일 | 설명 |
|------|------|
| `config/R2Config.java` | S3Client, S3Presigner Bean 설정 |
| `image/domain/Image.java` | 이미지 메타데이터 엔티티 |
| `image/repository/ImageRepository.java` | 이미지 Repository |
| `image/dto/PresignRequest.java` | Presigned URL 요청 DTO (fileName, contentType) |
| `image/dto/PresignResponse.java` | Presigned URL 응답 DTO (uploadUrl, objectKey) |
| `image/dto/ImageCreateRequest.java` | 이미지 저장 요청 DTO |
| `image/dto/ImageResponse.java` | 이미지 응답 DTO |
| `image/service/ImageService.java` | 이미지 비즈니스 로직 |
| `image/controller/ImageController.java` | 이미지 API 컨트롤러 |

---

## 수정된 파일 (3개)

| 파일 | 변경 내용 |
|------|----------|
| `build.gradle` | AWS S3 SDK 의존성 추가 |
| `application.yaml` | R2 설정 추가 (endpoint, credentials, bucket) |
| `application.yaml (test)` | 테스트용 R2 설정 추가 |

---

## API 엔드포인트

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| POST | `/images/presign` | Presigned URL 발급 | 필요 |
| POST | `/images` | 이미지 메타데이터 저장 | 필요 |

---

## 핵심 로직

### 1. Presigned URL 발급 (`POST /images/presign`)

```
요청: { fileName, contentType }
응답: { uploadUrl, objectKey }
```

- Object Key 형식: `images/{UUID}_{원본파일명}`
- 만료 시간: 설정 가능 (기본 15분)

### 2. 이미지 메타데이터 저장 (`POST /images`)

```
요청: { progressLogId, objectKey, fileName, contentType }
응답: { id, progressLogId, objectKey, fileName, contentType, createdAt }
```

- 진행 로그 소유권 검증 (본인 로그에만 이미지 저장 가능)

---

## 업로드 플로우

```
1. 클라이언트 → POST /images/presign (파일 정보)
2. 백엔드 → Presigned URL + Object Key 반환
3. 클라이언트 → PUT [Presigned URL] (파일 직접 업로드 to R2)
4. 클라이언트 → POST /images (메타데이터 저장)
5. 백엔드 → 이미지 정보 DB 저장
```

---

## R2 설정 (application.yaml)

```yaml
cloudflare:
  r2:
    endpoint-url: ${R2_ENDPOINT_URL}
    access-key-id: ${R2_ACCESS_KEY_ID}
    secret-access-key: ${R2_SECRET_ACCESS_KEY}
    bucket-name: ${R2_BUCKET_NAME:miniature-backlog}
    presign-expiration-minutes: ${R2_PRESIGN_EXPIRATION_MINUTES:15}
```

---

## Image 엔티티 구조

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long | PK |
| progress_log_id | Long | 연결된 진행 로그 ID |
| object_key | String(500) | R2 저장 경로 |
| file_name | String(255) | 원본 파일명 |
| content_type | String(100) | MIME 타입 |
| created_at | LocalDateTime | 생성 시각 |

---

## 완료일

2026-01-23
