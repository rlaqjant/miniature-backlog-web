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
  md: 'h-2',
  lg: 'h-3',
}

/**
 * 진행률에 따른 색상 결정 (자연주의 팔레트)
 * 0-30%: 테라코타 (시작 단계)
 * 31-70%: 골드 (진행 중)
 * 71-99%: 포레스트 라이트 (마무리 단계)
 * 100%: 포레스트 (완료)
 */
const getColorByProgress = (value: number): string => {
  if (value === 100) return 'bg-forest-500'
  if (value >= 71) return 'bg-forest-400'
  if (value >= 31) return 'bg-gold-500'
  return 'bg-terracotta-500'
}

const colorStyles = {
  primary: 'bg-forest-500',
  success: 'bg-forest-500',
  warning: 'bg-gold-500',
}

/**
 * 진행률 바 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
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
        className={`w-full overflow-hidden rounded-full bg-cream-200 dark:bg-charcoal-500 ${sizeStyles[size]}`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${sizeStyles[size]} ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showPercent && (
        <span className="mt-1.5 block text-xs font-medium text-stone-500">
          {clampedValue}%
        </span>
      )}
    </div>
  )
}
