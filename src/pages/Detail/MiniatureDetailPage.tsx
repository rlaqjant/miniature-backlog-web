import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Spinner } from '@/components/common'
import {
  MiniatureInfo,
  BacklogSteps,
  ProgressLogList,
  EditMiniatureModal,
  DeleteConfirmModal,
} from '@/components/detail'
import { useMiniatureDetail } from '@/hooks/useMiniatureDetail'

/**
 * 미니어처 상세 페이지
 */
export function MiniatureDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const miniatureId = Number(id)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const {
    miniature,
    progressLogs,
    isLoading,
    error,
    updateBacklogStatus,
    updateMiniature,
    deleteMiniature,
    isUpdating,
    isDeleting,
  } = useMiniatureDetail(miniatureId)

  // 잘못된 ID
  if (isNaN(miniatureId)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50">
          잘못된 접근입니다
        </h2>
        <p className="mt-2 text-stone-500">유효하지 않은 백로그 ID입니다</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-forest-500 hover:underline"
        >
          대시보드로 돌아가기
        </button>
      </div>
    )
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  // 에러 또는 데이터 없음
  if (error || !miniature) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50">
          {error || '백로그를 찾을 수 없습니다'}
        </h2>
        <p className="mt-2 text-stone-500">요청하신 백로그가 존재하지 않거나 접근 권한이 없습니다</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-forest-500 hover:underline"
        >
          대시보드로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-forest-500 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        대시보드로 돌아가기
      </button>

      <div className="space-y-6">
        {/* 기본 정보 */}
        <MiniatureInfo
          miniature={miniature}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
          onTogglePublic={updateMiniature}
          isUpdating={isUpdating}
        />

        {/* 백로그 단계 */}
        <BacklogSteps
          items={miniature.backlogItems}
          onStatusChange={updateBacklogStatus}
          isUpdating={isUpdating}
        />

        {/* 진행 로그 */}
        <ProgressLogList logs={progressLogs} />
      </div>

      {/* 수정 모달 */}
      <EditMiniatureModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        miniature={miniature}
        onSave={updateMiniature}
        isSaving={isUpdating}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemName={miniature.title}
        onConfirm={deleteMiniature}
        isDeleting={isDeleting}
      />
    </div>
  )
}
