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
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        {/* 셀렉트 */}
        <select
          ref={ref}
          id={selectId}
          className={`
            block w-full appearance-none rounded-lg border bg-white px-4 py-2.5
            text-gray-900
            transition-colors duration-200
            focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50
            dark:bg-gray-800 dark:text-white
            ${hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600'
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

Select.displayName = 'Select'
