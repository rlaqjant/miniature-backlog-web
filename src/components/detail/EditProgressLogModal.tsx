import { useState, useCallback } from 'react'
import { Modal, Textarea, Button } from '@/components/common'
import type { ProgressLogResponse, ProgressLogUpdateRequest } from '@/types'

interface EditProgressLogModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 모달 닫기 핸들러 */
  onClose: () => void
  /** 수정할 로그 */
  log: ProgressLogResponse | null
  /** 저장 핸들러 */
  onSave: (data: ProgressLogUpdateRequest) => Promise<void>
  /** 저장 중 상태 */
  isSaving: boolean
}

const MAX_CONTENT_LENGTH = 2000

/**
 * 진행 기록 수정 모달
 * 부모에서 key={log?.id}를 전달하여 log 변경 시 상태를 리셋
 */
export function EditProgressLogModal({
  isOpen,
  onClose,
  log,
  onSave,
  isSaving,
}: EditProgressLogModalProps) {
  const [content, setContent] = useState(log?.content ?? '')
  const [isPublic, setIsPublic] = useState(log?.isPublic ?? false)
  const [error, setError] = useState<string | null>(null)

  // 모달 닫기
  const handleClose = useCallback(() => {
    if (!isSaving) {
      setError(null)
      onClose()
    }
  }, [isSaving, onClose])

  // 저장 처리
  const handleSave = useCallback(async () => {
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
      await onSave({ content: trimmedContent, isPublic })
      onClose()
    } catch (err) {
      const message = err instanceof Error ? err.message : '수정에 실패했습니다'
      setError(message)
    }
  }, [content, isPublic, onSave, onClose])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="진행 기록 수정">
      <div className="space-y-4">
        {/* 내용 입력 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-charcoal-700 dark:text-cream-200">
            내용
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="작업 내용을 수정해보세요..."
            rows={4}
            maxLength={MAX_CONTENT_LENGTH}
            disabled={isSaving}
          />
          <div className="mt-1 text-right text-xs text-stone-400">
            {content.length}/{MAX_CONTENT_LENGTH}자
          </div>
        </div>

        {/* 기존 이미지 (읽기 전용) */}
        {log?.images && log.images.length > 0 && (
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal-700 dark:text-cream-200">
              첨부 이미지
            </label>
            <div className="flex flex-wrap gap-2">
              {log.images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={image.fileName}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {/* 공개 여부 */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="editIsPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            disabled={isSaving}
            className="h-4 w-4 rounded border-cream-300 text-forest-600 focus:ring-forest-500 dark:border-charcoal-500"
          />
          <label
            htmlFor="editIsPublic"
            className="text-sm text-charcoal-700 dark:text-cream-200"
          >
            공개 게시판에 공유
          </label>
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* 버튼 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !content.trim()}>
            {isSaving ? '수정 중...' : '수정'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
