interface SpinnerProps {
  /** 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 색상 */
  color?: 'primary' | 'white' | 'gray'
  /** 로딩 텍스트 */
  label?: string
}

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

const colorStyles = {
  primary: 'text-forest-500',
  white: 'text-cream-50',
  gray: 'text-stone-500',
}

/**
 * 로딩 스피너 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function Spinner({
  size = 'md',
  color = 'primary',
  label,
}: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3" role="status">
      <svg
        className={`animate-spin ${sizeStyles[size]} ${colorStyles[color]}`}
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
      {label && (
        <span className="text-sm font-medium text-stone-500">{label}</span>
      )}
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
