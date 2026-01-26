import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button, Input, Card } from '@/components/common'
import { useAuthStore } from '@/stores'
import { authApi } from '@/services/api'

/**
 * 회원가입 페이지
 */
export function RegisterPage() {
  const navigate = useNavigate()
  const { setLoading, isLoading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // 비밀번호 확인 일치 여부
  const passwordMatch = password === passwordConfirm
  const passwordError = passwordConfirm && !passwordMatch ? '비밀번호가 일치하지 않습니다.' : undefined

  // 폼 유효성
  const isValid = email && password && passwordConfirm && nickname && passwordMatch && password.length >= 8

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await authApi.register({ email, password, nickname })

      // 회원가입 성공
      setSuccess(true)

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      // 에러 처리
      if (err instanceof Error) {
        setError('회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.')
      } else {
        setError('회원가입 중 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  // 회원가입 성공 화면
  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4 text-5xl">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            회원가입 완료!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            잠시 후 로그인 페이지로 이동합니다...
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            회원가입
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            PaintLater와 함께 미니어처 도색을 기록하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* 닉네임 */}
          <Input
            type="text"
            label="닉네임"
            placeholder="사용할 닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            fullWidth
            autoComplete="nickname"
            helperText="다른 사용자에게 보여질 이름입니다."
          />

          {/* 비밀번호 */}
          <Input
            type="password"
            label="비밀번호"
            placeholder="8자 이상 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="new-password"
            helperText="영문, 숫자를 포함하여 8자 이상"
          />

          {/* 비밀번호 확인 */}
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            fullWidth
            autoComplete="new-password"
            error={passwordError}
          />

          {/* 회원가입 버튼 */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={!isValid}
          >
            회원가입
          </Button>
        </form>

        {/* 로그인 링크 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            로그인
          </Link>
        </div>
      </Card>
    </div>
  )
}
