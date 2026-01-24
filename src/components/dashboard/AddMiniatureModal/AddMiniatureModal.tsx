import { useState, type FormEvent } from 'react'
import { Modal } from '@/components/common/Modal'
import { Input, Button } from '@/components/common'
import { Textarea } from '@/components/common/Textarea'
import type { CreateMiniatureRequest } from '@/types'

interface AddMiniatureModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 제출 핸들러 */
  onSubmit: (data: CreateMiniatureRequest) => Promise<void>
  /** 제출 중 상태 */
  isSubmitting: boolean
}

/**
 * 미니어처 추가 모달 컴포넌트
 */
export function AddMiniatureModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: AddMiniatureModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // 유효성 검사
    if (!title.trim()) {
      setError('제목을 입력해주세요')
      return
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      // 성공 시 폼 초기화 및 모달 닫기
      setTitle('')
      setDescription('')
      onClose()
    } catch {
      setError('백로그 추가에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('')
      setDescription('')
      setError('')
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="새 백로그 추가" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* 제목 입력 */}
          <Input
            label="제목"
            placeholder="미니어처 이름을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={error && !title.trim() ? error : undefined}
            fullWidth
            autoFocus
            disabled={isSubmitting}
          />

          {/* 설명 입력 */}
          <Textarea
            label="설명 (선택)"
            placeholder="백로그에 대한 간단한 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            rows={3}
            disabled={isSubmitting}
          />

          {/* 에러 메시지 */}
          {error && title.trim() && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            추가
          </Button>
        </div>
      </form>
    </Modal>
  )
}
