import { useState, useCallback } from 'react'
import { Modal, Textarea, Button, ImageUploader } from '@/components/common'

interface UploadProgress {
  step: 'creating' | 'uploading'
  current: number
  total: number
  imagePercent?: number
}

interface AddProgressLogModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 모달 닫기 핸들러 */
  onClose: () => void
  /** 저장 핸들러 */
  onSave: (content: string, isPublic: boolean, files?: File[]) => Promise<void>
  /** 저장 중 상태 */
  isSaving: boolean
  /** 업로드 진행 상태 */
  uploadProgress?: UploadProgress | null
}

const MAX_CONTENT_LENGTH = 2000

/**
 * 진행 기록 추가 모달
 */
export function AddProgressLogModal({
  isOpen,
  onClose,
  onSave,
  isSaving,
  uploadProgress,
}: AddProgressLogModalProps) {
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  // 폼 초기화
  const resetForm = useCallback(() => {
    setContent('')
    setIsPublic(true)
    setFiles([])
    setError(null)
  }, [])

  // 모달 닫기
  const handleClose = useCallback(() => {
    if (!isSaving) {
      resetForm()
      onClose()
    }
  }, [isSaving, onClose, resetForm])

  // 저장 처리
  const handleSave = useCallback(async () => {
    // 검증
    const trimmedContent = content.trim()
    if (!trimmedContent) {
      setError('내용을 입력해주세요')
      return
    }
    if (trimmedContent.length > MAX_CONTENT_LENGTH) {
      setError(`내용은 ${MAX_CONTENT_LENGTH}자 이내로 입력해주세요`)
      return
    }

    setError(null)

    try {
      await onSave(trimmedContent, isPublic, files.length > 0 ? files : undefined)
      resetForm()
      onClose()
    } catch (err) {
      // 에러 메시지 표시 (모달 닫지 않음)
      const message = err instanceof Error ? err.message : '저장에 실패했습니다'
      setError(message)
    }
  }, [content, isPublic, files, onSave, resetForm, onClose])

  // 진행 상태 메시지
  const getProgressMessage = () => {
    if (!uploadProgress) return null

    if (uploadProgress.step === 'creating') {
      return '진행 로그 생성 중...'
    }

    const { current, total, imagePercent } = uploadProgress
    return `이미지 ${current}/${total} 업로드 중... ${imagePercent || 0}%`
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="진행 기록 작성">
      <div className="space-y-4">
        {/* 내용 입력 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal-700 dark:text-cream-200">
            내용
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 작업 내용을 기록해보세요..."
            rows={4}
            maxLength={MAX_CONTENT_LENGTH}
            disabled={isSaving}
          />
          <div className="mt-1 text-right text-xs text-stone-400">
            {content.length}/{MAX_CONTENT_LENGTH}자
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal-700 dark:text-cream-200">
            이미지 첨부 (선택)
          </label>
          <ImageUploader
            files={files}
            onChange={setFiles}
            maxFiles={5}
            disabled={isSaving}
          />
        </div>

        {/* 비공개 여부 */}
        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={!isPublic}
              onChange={(e) => setIsPublic(!e.target.checked)}
              disabled={isSaving}
              className="h-4 w-4 rounded border-cream-300 text-forest-600 focus:ring-forest-500 dark:border-charcoal-600"
            />
            <label
              htmlFor="isPrivate"
              className="text-sm text-charcoal-700 dark:text-cream-200"
            >
              비공개
            </label>
          </div>
          <p className="mt-1 ml-6 text-xs text-stone-400">
            비공개 작업은 공개 백로그에서 숨겨집니다.
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* 진행 상태 */}
        {isSaving && uploadProgress && (
          <div className="rounded-lg bg-forest-50 p-3 dark:bg-forest-900/20">
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span className="text-sm text-forest-700 dark:text-forest-300">
                {getProgressMessage()}
              </span>
            </div>
            {uploadProgress.step === 'uploading' && uploadProgress.imagePercent != null && (
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-forest-200 dark:bg-forest-800">
                <div
                  className="h-full bg-forest-500 transition-all"
                  style={{ width: `${uploadProgress.imagePercent}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !content.trim()}>
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-forest-600"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
