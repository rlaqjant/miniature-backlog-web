interface ProgressBarProps {
  /** 진행률 (0-100) */
  value: number
  /** 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 퍼센트 텍스트 표시 여부 */
  showPercent?: boolean
  /** 색상 (진행률에 따라 자동 설정 또는 고정) */
  color?: 'auto' | 'primary' | 'success' | 'warning'
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const getColorByProgress = (value: number): string => {
  if (value === 100) return 'bg-green-500'
  if (value >= 50) return 'bg-indigo-500'
  return 'bg-amber-500'
}

const colorStyles = {
  primary: 'bg-indigo-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
}

/**
 * 진행률 바 컴포넌트
 */
export function ProgressBar({
  value,
  size = 'md',
  showPercent = false,
  color = 'auto',
}: ProgressBarProps) {
  // 값 범위 제한 (0-100)
  const clampedValue = Math.min(100, Math.max(0, value))

  const barColor = color === 'auto'
    ? getColorByProgress(clampedValue)
    : colorStyles[color]

  return (
    <div className="w-full">
      <div
        className={`w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${sizeStyles[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${sizeStyles[size]} ${barColor} transition-all duration-300 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showPercent && (
        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {clampedValue}%
        </span>
      )}
    </div>
  )
}
