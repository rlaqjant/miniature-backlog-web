import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 */
  label?: string
  /** 에러 메시지 */
  error?: string
  /** 도움말 텍스트 */
  helperText?: string
  /** 좌측 아이콘 */
  leftIcon?: ReactNode
  /** 우측 아이콘 */
  rightIcon?: ReactNode
  /** 전체 너비 사용 */
  fullWidth?: boolean
}

/**
 * 공통 입력 컴포넌트
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const hasError = Boolean(error)

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* 레이블 */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        {/* 입력 필드 래퍼 */}
        <div className="relative">
          {/* 좌측 아이콘 */}
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full rounded-lg border px-4 py-2.5
              text-gray-900 placeholder-gray-400
              transition-colors duration-200
              focus:outline-none focus:ring-2
              disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50
              dark:bg-gray-800 dark:text-white dark:placeholder-gray-500
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600'
              }
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            {...props}
          />

          {/* 우측 아이콘 */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* 도움말 텍스트 */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
