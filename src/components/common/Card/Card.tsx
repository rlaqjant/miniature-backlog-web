import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 카드 내부 패딩 */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** 호버 효과 */
  hoverable?: boolean
  /** 카드 헤더 */
  header?: ReactNode
  /** 카드 푸터 */
  footer?: ReactNode
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * 공통 카드 컴포넌트
 * 자연주의 프리미엄 디자인 시스템
 */
export function Card({
  padding = 'md',
  hoverable = false,
  header,
  footer,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        overflow-hidden rounded-2xl border border-cream-200 bg-cream-100
        shadow-soft
        dark:border-charcoal-600 dark:bg-[#252219]
        ${hoverable ? 'transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {/* 헤더 */}
      {header && (
        <div className="border-b border-cream-200 px-6 py-4 dark:border-charcoal-600">
          {header}
        </div>
      )}

      {/* 본문 */}
      <div className={paddingStyles[padding]}>
        {children}
      </div>

      {/* 푸터 */}
      {footer && (
        <div className="border-t border-cream-200 px-6 py-4 dark:border-charcoal-600">
          {footer}
        </div>
      )}
    </div>
  )
}
