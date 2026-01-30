import { useCallback, useRef, useState } from 'react'

interface ImageUploaderProps {
  /** 선택된 파일 목록 */
  files: File[]
  /** 파일 변경 시 호출 */
  onChange: (files: File[]) => void
  /** 최대 파일 수 (기본: 5) */
  maxFiles?: number
  /** 비활성화 상태 */
  disabled?: boolean
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

/**
 * 이미지 업로드 컴포넌트
 * 드래그 앤 드롭, 클릭 선택, 미리보기 지원
 */
export function ImageUploader({
  files,
  onChange,
  maxFiles = 5,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 파일 검증
  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `${file.name}: 지원하지 않는 형식입니다 (jpg, png, gif, webp만 허용)`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: 파일 크기가 10MB를 초과합니다`
    }
    return null
  }, [])

  // 파일 추가
  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null)
      const fileArray = Array.from(newFiles)

      // 최대 개수 체크
      const remainingSlots = maxFiles - files.length
      if (remainingSlots <= 0) {
        setError(`최대 ${maxFiles}장까지만 첨부할 수 있습니다`)
        return
      }

      const filesToAdd: File[] = []
      const errors: string[] = []

      for (const file of fileArray.slice(0, remainingSlots)) {
        const validationError = validateFile(file)
        if (validationError) {
          errors.push(validationError)
        } else {
          filesToAdd.push(file)
        }
      }

      if (errors.length > 0) {
        setError(errors[0]) // 첫 번째 에러만 표시
      }

      if (filesToAdd.length > 0) {
        onChange([...files, ...filesToAdd])
      }
    },
    [files, maxFiles, onChange, validateFile]
  )

  // 파일 제거
  const removeFile = useCallback(
    (index: number) => {
      setError(null)
      onChange(files.filter((_, i) => i !== index))
    },
    [files, onChange]
  )

  // 클릭으로 파일 선택
  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }, [disabled])

  // 파일 입력 변경
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files)
      }
      // 같은 파일 재선택을 위해 value 초기화
      e.target.value = ''
    },
    [handleFiles]
  )

  // 드래그 이벤트 핸들러
  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (!disabled && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [disabled, handleFiles]
  )

  return (
    <div className="space-y-3">
      {/* 드롭존 */}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors
          ${
            isDragging
              ? 'border-forest-500 bg-forest-50 dark:bg-forest-900/20'
              : 'border-cream-300 hover:border-forest-400 dark:border-charcoal-600 dark:hover:border-forest-500'
          }
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        <CameraIcon className="h-8 w-8 text-stone-400" />
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          클릭하거나 이미지를 드래그하세요
        </p>
        <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
          최대 {maxFiles}장, JPG/PNG/GIF/WebP (각 10MB 이하)
        </p>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        multiple
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* 에러 메시지 */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* 미리보기 목록 */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <ImagePreview
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeFile(index)}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 이미지 미리보기 컴포넌트
 */
interface ImagePreviewProps {
  file: File
  onRemove: () => void
  disabled: boolean
}

function ImagePreview({ file, onRemove, disabled }: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 로컬 URL 생성
  useState(() => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  })

  return (
    <div className="group relative h-20 w-20">
      {previewUrl && (
        <img
          src={previewUrl}
          alt={file.name}
          className="h-full w-full rounded-lg object-cover"
        />
      )}
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
          title="제거"
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
