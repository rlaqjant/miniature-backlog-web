import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** 레이블 */
  label?: string
  /** 옵션 목록 */
  options: SelectOption[]
  /** 에러 메시지 */
  error?: string
  /** 도움말 텍스트 */
  helperText?: string
  /** 전체 너비 사용 */
  fullWidth?: boolean
  /** 플레이스홀더 */
  placeholder?: string
}

/**
 * 공통 셀렉트 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      fullWidth = false,
      placeholder,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const hasError = Boolean(error)

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* 레이블 */}
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-charcoal-500 dark:text-cream-200"
          >
            {label}
          </label>
        )}

        {/* 셀렉트 */}
        <select
          ref={ref}
          id={selectId}
          className={`
            block w-full appearance-none rounded-lg border bg-white px-4 py-3
            text-charcoal-500
            transition-all duration-200
            focus:outline-none
            disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-50
            dark:bg-[#1a1814] dark:text-cream-100
            ${hasError
              ? 'border-[#c75f5f] focus:border-[#c75f5f] focus:ring-2 focus:ring-[#c75f5f]/20'
              : 'border-cream-200 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 dark:border-charcoal-600'
            }
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* 에러 메시지 */}
        {error && (
          <p
            id={`${selectId}-error`}
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

Select.displayName = 'Select'
