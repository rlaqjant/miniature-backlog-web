import { useState } from 'react'
import { Modal, Button, Input, Textarea } from '@/components/common'
import type { MiniatureDetail, UpdateMiniatureRequest } from '@/types'

interface EditMiniatureModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 수정할 미니어처 정보 */
  miniature: MiniatureDetail
  /** 저장 핸들러 */
  onSave: (data: UpdateMiniatureRequest) => Promise<void>
  /** 저장 중 상태 */
  isSaving?: boolean
}

/**
 * 미니어처 정보 수정 모달
 * 모달이 열릴 때마다 key prop으로 새로 마운트되어 초기값이 설정됨
 */
export function EditMiniatureModal({
  isOpen,
  onClose,
  miniature,
  onSave,
  isSaving,
}: EditMiniatureModalProps) {
  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null

  return (
    <EditMiniatureForm
      miniature={miniature}
      onClose={onClose}
      onSave={onSave}
      isSaving={isSaving}
    />
  )
}

interface EditMiniatureFormProps {
  miniature: MiniatureDetail
  onClose: () => void
  onSave: (data: UpdateMiniatureRequest) => Promise<void>
  isSaving?: boolean
}

/**
 * 수정 폼 (모달이 열릴 때마다 새로 마운트)
 */
function EditMiniatureForm({
  miniature,
  onClose,
  onSave,
  isSaving,
}: EditMiniatureFormProps) {
  const [title, setTitle] = useState(miniature.title)
  const [description, setDescription] = useState(miniature.description || '')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 유효성 검사
    if (!title.trim()) {
      setError('제목을 입력해주세요')
      return
    }

    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정에 실패했습니다')
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="백로그 수정" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="미니어처 이름을 입력하세요"
          fullWidth
          disabled={isSaving}
          error={!title.trim() && error ? '제목을 입력해주세요' : undefined}
        />

        <Textarea
          label="설명 (선택)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="미니어처에 대한 간단한 설명"
          rows={3}
          fullWidth
          disabled={isSaving}
        />

        {error && (
          <p className="text-sm text-[#c75f5f]" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            취소
          </Button>
          <Button type="submit" isLoading={isSaving}>
            저장
          </Button>
        </div>
      </form>
    </Modal>
  )
}
