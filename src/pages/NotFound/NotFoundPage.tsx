import { Link } from 'react-router'
import { Button } from '@/components/common'

/**
 * 404 페이지
 */
export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-9xl font-bold text-gray-200 dark:text-gray-800">
        404
      </h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link to="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  )
}
