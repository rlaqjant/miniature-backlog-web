import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant
  /** 버튼 크기 */
  size?: ButtonSize
  /** 로딩 상태 */
  isLoading?: boolean
  /** 아이콘 (좌측) */
  leftIcon?: ReactNode
  /** 아이콘 (우측) */
  rightIcon?: ReactNode
  /** 전체 너비 사용 */
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-forest-500 text-cream-50 hover:bg-forest-400 focus:ring-forest-500/30 dark:bg-forest-500 dark:hover:bg-forest-400',
  secondary: 'bg-cream-200 text-charcoal-500 hover:bg-cream-300 focus:ring-cream-400/30 dark:bg-charcoal-500 dark:text-cream-100 dark:hover:bg-charcoal-500/80',
  outline: 'border-2 border-cream-300 text-charcoal-500 hover:bg-cream-100 focus:ring-forest-500/20 dark:border-charcoal-500 dark:text-cream-200 dark:hover:bg-charcoal-500/30',
  ghost: 'text-forest-500 hover:bg-forest-100 focus:ring-forest-500/20 dark:text-forest-300 dark:hover:bg-forest-900/30',
  accent: 'bg-gold-500 text-charcoal-900 hover:bg-gold-600 focus:ring-gold-500/30',
  danger: 'bg-[#c75f5f] text-cream-50 hover:bg-[#b54f4f] focus:ring-[#c75f5f]/30',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

/**
 * 공통 버튼 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg font-semibold
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-50
          dark:focus:ring-offset-charcoal-900
          disabled:cursor-not-allowed disabled:opacity-50
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <ButtonSpinner size={size} />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// 버튼 내부 스피너
function ButtonSpinner({ size }: { size: ButtonSize }) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size]

  return (
    <svg
      className={`animate-spin ${sizeClass}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
