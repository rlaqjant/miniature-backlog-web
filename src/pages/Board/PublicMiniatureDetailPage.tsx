import { useParams, useNavigate } from 'react-router'
import { Spinner } from '@/components/common'
import { ProgressBar } from '@/components/dashboard/ProgressBar'
import { BacklogSteps, ProgressLogList } from '@/components/detail'
import { usePublicMiniatureDetail } from '@/hooks/usePublicMiniatureDetail'
import { useAuthStore } from '@/stores'

/**
 * 공개 미니어처 상세 페이지
 * 읽기 전용: 기본 정보 + 작업 단계 + 공개 진행 기록
 */
export function PublicMiniatureDetailPage() {
  const { miniatureId } = useParams<{ miniatureId: string }>()
  const navigate = useNavigate()
  const id = Number(miniatureId)
  const { isAuthenticated } = useAuthStore()

  const { miniature, progressLogs, isLoading, error, toggleLike } = usePublicMiniatureDetail(id)

  const handleLikeClick = () => {
    if (!isAuthenticated) return
    toggleLike()
  }

  // 잘못된 ID
  if (isNaN(id)) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-display text-xl font-semibold text-charcoal-900 dark:text-cream-50">
          잘못된 접근입니다
        </h2>
        <p className="mt-2 text-stone-500">유효하지 않은 작업 ID입니다</p>
        <button
          onClick={() => navigate('/board')}
          className="mt-4 text-forest-500 hover:underline"
        >
          게시판으로 돌아가기
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
          {error || '작업을 찾을 수 없습니다'}
        </h2>
        <p className="mt-2 text-stone-500">요청하신 작업이 존재하지 않거나 공개되지 않았습니다</p>
        <button
          onClick={() => navigate('/board')}
          className="mt-4 text-forest-500 hover:underline"
        >
          게시판으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/board')}
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-forest-500 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        게시판으로 돌아가기
      </button>

      <div className="space-y-6">
        {/* 기본 정보 (인라인) */}
        <div className="rounded-2xl bg-white p-6 shadow-soft dark:bg-[#252219]">
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-charcoal-900 dark:text-cream-50 sm:text-3xl">
              {miniature.title}
            </h1>
            {miniature.description && (
              <p className="mt-2 text-stone-500 dark:text-stone-400">
                {miniature.description}
              </p>
            )}
          </div>

          {/* 작성자 + 좋아요 */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium text-charcoal-500 dark:text-cream-300">
                {miniature.userNickname}
              </span>
            </div>

            {/* 좋아요 버튼 */}
            <button
              type="button"
              onClick={handleLikeClick}
              disabled={!isAuthenticated}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                !isAuthenticated
                  ? 'cursor-default bg-cream-100 text-stone-500 dark:bg-charcoal-600 dark:text-cream-300'
                  : miniature.liked
                    ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20'
                    : 'bg-cream-100 text-stone-500 hover:bg-cream-200 dark:bg-charcoal-600 dark:text-cream-300 dark:hover:bg-charcoal-500'
              }`}
            >
              {miniature.liked ? (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
              {miniature.likeCount}
            </button>
          </div>

          {/* 진행률 */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal-500 dark:text-cream-200">
                전체 진행률
              </span>
              <span className="text-sm font-semibold text-forest-500">
                {miniature.progress}%
              </span>
            </div>
            <ProgressBar value={miniature.progress} size="lg" />
          </div>

          {/* 메타 정보 */}
          <div className="mt-4 flex gap-4 text-xs text-stone-500">
            <span>
              생성:{' '}
              {new Date(miniature.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span>
              수정:{' '}
              {new Date(miniature.updatedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* 백로그 단계 (읽기 전용) */}
        <BacklogSteps items={miniature.backlogItems} readonly />

        {/* 공개 진행 기록 */}
        <ProgressLogList logs={progressLogs} />
      </div>
    </div>
  )
}
