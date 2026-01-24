import { Modal, Button } from '@/components/common'

interface DeleteConfirmModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 삭제할 항목 이름 */
  itemName: string
  /** 삭제 확인 핸들러 */
  onConfirm: () => Promise<void>
  /** 삭제 중 상태 */
  isDeleting?: boolean
}

/**
 * 삭제 확인 모달
 */
export function DeleteConfirmModal({
  isOpen,
  onClose,
  itemName,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="삭제 확인" size="sm">
      <div className="text-center">
        {/* 경고 아이콘 */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c75f5f]/10">
          <svg
            className="h-6 w-6 text-[#c75f5f]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 메시지 */}
        <p className="mt-4 text-charcoal-700 dark:text-cream-200">
          <strong className="font-semibold text-charcoal-900 dark:text-cream-50">
            "{itemName}"
          </strong>
          을(를) 삭제하시겠습니까?
        </p>
        <p className="mt-2 text-sm text-stone-500">
          이 작업은 되돌릴 수 없으며, 모든 진행 기록도 함께 삭제됩니다.
        </p>

        {/* 버튼 */}
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            취소
          </Button>
          <Button variant="danger" onClick={handleConfirm} isLoading={isDeleting}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  )
}
