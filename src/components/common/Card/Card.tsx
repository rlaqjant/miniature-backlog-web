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
        overflow-hidden rounded-xl border border-gray-200 bg-white
        dark:border-gray-700 dark:bg-gray-800
        ${hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : ''}
        ${className}
      `}
      {...props}
    >
      {/* 헤더 */}
      {header && (
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          {header}
        </div>
      )}

      {/* 본문 */}
      <div className={paddingStyles[padding]}>
        {children}
      </div>

      {/* 푸터 */}
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  )
}
