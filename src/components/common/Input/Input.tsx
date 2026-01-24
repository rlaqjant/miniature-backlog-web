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
 * 자연주의 프리미엄 디자인 시스템
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
            className="mb-2 block text-sm font-medium text-charcoal-500 dark:text-cream-200"
          >
            {label}
          </label>
        )}

        {/* 입력 필드 래퍼 */}
        <div className="relative">
          {/* 좌측 아이콘 */}
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500">
              {leftIcon}
            </div>
          )}

          {/* 입력 필드 */}
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full rounded-lg border bg-white px-4 py-3
              text-charcoal-500 placeholder-stone-500
              transition-all duration-200
              focus:outline-none
              disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-50
              dark:bg-[#1a1814] dark:text-cream-100 dark:placeholder-stone-500
              ${leftIcon ? 'pl-11' : ''}
              ${rightIcon ? 'pr-11' : ''}
              ${hasError
                ? 'border-[#c75f5f] focus:border-[#c75f5f] focus:ring-2 focus:ring-[#c75f5f]/20'
                : 'border-cream-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 dark:border-charcoal-500'
              }
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            {...props}
          />

          {/* 우측 아이콘 */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-500">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-[#c75f5f]"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* 도움말 텍스트 */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-stone-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
