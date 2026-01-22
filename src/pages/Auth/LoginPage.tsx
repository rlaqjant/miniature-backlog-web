import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { Button, Input, Card } from '@/components/common'
import { useAuthStore } from '@/stores'
import { authApi } from '@/services/api'

/**
 * 로그인 페이지
 */
export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, setLoading, isLoading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // 로그인 후 돌아갈 경로
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await authApi.login({ email, password })

      // 로그인 성공
      login(
        response.user || { id: '', email, nickname: email.split('@')[0], createdAt: new Date().toISOString() },
        { accessToken: response.accessToken }
      )

      navigate(from, { replace: true })
    } catch (err) {
      // 에러 처리
      if (err instanceof Error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else {
        setError('로그인 중 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            로그인
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            SinTower에 오신 것을 환영합니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 에러 메시지 */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {/* 이메일 */}
          <Input
            type="email"
            label="이메일"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoComplete="email"
          />

          {/* 비밀번호 */}
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="current-password"
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={!email || !password}
          >
            로그인
          </Button>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            회원가입
          </Link>
        </div>
      </Card>
    </div>
  )
}
