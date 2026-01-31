import { useState, useEffect, useCallback } from 'react'
import { adminApi } from '@services/api'
import { Spinner, Pagination } from '@components/common'
import type { AdminMiniature, AdminUser, PageResponse } from '@/types'

type Tab = 'miniatures' | 'users'

/**
 * 검색 입력 컴포넌트 (300ms debounce)
 */
function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [internal, setInternal] = useState(value)

  // 외부 value 변경 시 동기화
  useEffect(() => {
    setInternal(value)
  }, [value])

  // 300ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (internal !== value) {
        onChange(internal)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [internal, value, onChange])

  return (
    <input
      type="text"
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-cream-200 bg-white px-4 py-2 text-sm text-charcoal-800 placeholder-stone-400 outline-none transition-colors focus:border-charcoal-400 dark:border-charcoal-600 dark:bg-charcoal-800 dark:text-cream-100 dark:placeholder-stone-500 dark:focus:border-charcoal-400"
    />
  )
}

/**
 * 관리자 페이지
 * 게시글(미니어처) 관리와 사용자 관리 탭으로 구성
 */
export function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('miniatures')

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal-900 dark:text-cream-50">
          관리자 페이지
        </h1>
      </div>

      {/* 탭 */}
      <div className="mb-6 flex gap-1 border-b border-cream-200 dark:border-charcoal-600">
        <button
          type="button"
          onClick={() => setActiveTab('miniatures')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'miniatures'
              ? 'border-b-2 border-charcoal-900 text-charcoal-900 dark:border-cream-50 dark:text-cream-50'
              : 'text-stone-500 hover:text-charcoal-700 dark:hover:text-cream-200'
          }`}
        >
          게시글 관리
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-charcoal-900 text-charcoal-900 dark:border-cream-50 dark:text-cream-50'
              : 'text-stone-500 hover:text-charcoal-700 dark:hover:text-cream-200'
          }`}
        >
          사용자 관리
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'miniatures' ? <MiniatureTab /> : <UserTab />}
    </div>
  )
}

/**
 * 게시글 관리 탭
 */
function MiniatureTab() {
  const [data, setData] = useState<PageResponse<AdminMiniature> | null>(null)
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await adminApi.getMiniatures({
        page,
        size: 20,
        title: title || undefined,
        author: author || undefined,
      })
      setData(result)
    } catch {
      setError('게시글 목록을 불러오지 못했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [page, title, author])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value)
    setPage(0)
  }, [])

  const handleAuthorChange = useCallback((value: string) => {
    setAuthor(value)
    setPage(0)
  }, [])

  const handleTogglePublic = async (item: AdminMiniature) => {
    try {
      await adminApi.updateMiniature(item.id, { isPublic: !item.isPublic })
      fetchData()
    } catch {
      alert('공개 상태 변경에 실패했습니다.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    try {
      await adminApi.deleteMiniature(id)
      fetchData()
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const hasSearch = title || author

  return (
    <>
      {/* 검색 */}
      <div className="mb-4 flex gap-3 max-w-2xl">
        <SearchInput
          value={title}
          onChange={handleTitleChange}
          placeholder="제목 검색..."
        />
        <SearchInput
          value={author}
          onChange={handleAuthorChange}
          placeholder="작성자 검색..."
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10">
          <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={fetchData}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            다시 시도
          </button>
        </div>
      ) : !data || data.content.length === 0 ? (
        <p className="py-12 text-center text-stone-400">
          {hasSearch ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-cream-200 dark:border-charcoal-600">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-100 text-charcoal-700 dark:bg-charcoal-700 dark:text-cream-200">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">제목</th>
                  <th className="px-4 py-3 font-medium">작성자</th>
                  <th className="px-4 py-3 font-medium">진행률</th>
                  <th className="px-4 py-3 font-medium">공개</th>
                  <th className="px-4 py-3 font-medium">생성일</th>
                  <th className="px-4 py-3 font-medium">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 dark:divide-charcoal-600">
                {data.content.map((item) => (
                  <tr
                    key={item.id}
                    className="text-charcoal-800 dark:text-cream-100"
                  >
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{item.title}</td>
                    <td className="px-4 py-3">{item.userNickname}</td>
                    <td className="px-4 py-3">{item.progress}%</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleTogglePublic(item)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          item.isPublic
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-stone-100 text-stone-500 hover:bg-stone-200 dark:bg-charcoal-600 dark:text-stone-400'
                        }`}
                      >
                        {item.isPublic ? '공개' : '비공개'}
                      </button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              hasNext={data.hasNext}
              hasPrevious={data.hasPrevious}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  )
}

/**
 * 사용자 관리 탭
 */
function UserTab() {
  const [data, setData] = useState<PageResponse<AdminUser> | null>(null)
  const [page, setPage] = useState(0)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await adminApi.getUsers({
        page,
        size: 20,
        email: email || undefined,
        nickname: nickname || undefined,
      })
      setData(result)
    } catch {
      setError('사용자 목록을 불러오지 못했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [page, email, nickname])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
    setPage(0)
  }, [])

  const handleNicknameChange = useCallback((value: string) => {
    setNickname(value)
    setPage(0)
  }, [])

  const handleRoleChange = async (user: AdminUser) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
    if (!confirm(`${user.nickname}의 역할을 ${newRole}로 변경하시겠습니까?`)) return
    try {
      await adminApi.updateUser(user.id, { role: newRole })
      fetchData()
    } catch {
      alert('역할 변경에 실패했습니다.')
    }
  }

  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`${user.nickname} 사용자를 삭제하시겠습니까?\n해당 사용자의 미니어처 ${user.miniatureCount}개도 함께 삭제됩니다.`)) return
    try {
      await adminApi.deleteUser(user.id)
      fetchData()
    } catch {
      alert('사용자 삭제에 실패했습니다.')
    }
  }

  const hasSearch = email || nickname

  return (
    <>
      {/* 검색 */}
      <div className="mb-4 flex gap-3 max-w-2xl">
        <SearchInput
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일 검색..."
        />
        <SearchInput
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임 검색..."
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10">
          <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={fetchData}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            다시 시도
          </button>
        </div>
      ) : !data || data.content.length === 0 ? (
        <p className="py-12 text-center text-stone-400">
          {hasSearch ? '검색 결과가 없습니다.' : '사용자가 없습니다.'}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-cream-200 dark:border-charcoal-600">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-100 text-charcoal-700 dark:bg-charcoal-700 dark:text-cream-200">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">이메일</th>
                  <th className="px-4 py-3 font-medium">닉네임</th>
                  <th className="px-4 py-3 font-medium">역할</th>
                  <th className="px-4 py-3 font-medium">미니어처 수</th>
                  <th className="px-4 py-3 font-medium">가입일</th>
                  <th className="px-4 py-3 font-medium">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200 dark:divide-charcoal-600">
                {data.content.map((user) => (
                  <tr
                    key={user.id}
                    className="text-charcoal-800 dark:text-cream-100"
                  >
                    <td className="px-4 py-3">{user.id}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.nickname}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                            : 'bg-stone-100 text-stone-600 dark:bg-charcoal-600 dark:text-stone-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.miniatureCount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleRoleChange(user)}
                          className="rounded-lg px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          역할 변경
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user)}
                          disabled={user.role === 'ADMIN'}
                          className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                            user.role === 'ADMIN'
                              ? 'text-stone-300 cursor-not-allowed dark:text-stone-600'
                              : 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
                          }`}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              hasNext={data.hasNext}
              hasPrevious={data.hasPrevious}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  )
}
