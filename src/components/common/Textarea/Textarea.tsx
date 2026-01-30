import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 레이블 */
  label?: string
  /** 에러 메시지 */
  error?: string
  /** 도움말 텍스트 */
  helperText?: string
  /** 전체 너비 사용 */
  fullWidth?: boolean
}

/**
 * 공통 텍스트에어리어 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = id || generatedId
    const hasError = Boolean(error)

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* 레이블 */}
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-charcoal-500 dark:text-cream-200"
          >
            {label}
          </label>
        )}

        {/* 텍스트에어리어 */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            block w-full rounded-lg border bg-white px-4 py-3
            text-charcoal-500 placeholder-stone-500
            transition-all duration-200
            focus:outline-none
            disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-50
            dark:bg-[#1a1814] dark:text-cream-100 dark:placeholder-stone-500
            ${hasError
              ? 'border-[#c75f5f] focus:border-[#c75f5f] focus:ring-2 focus:ring-[#c75f5f]/20'
              : 'border-cream-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 dark:border-charcoal-600'
            }
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${textareaId}-error` : undefined}
          {...props}
        />

        {/* 에러 메시지 */}
        {error && (
          <p
            id={`${textareaId}-error`}
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

Textarea.displayName = 'Textarea'
