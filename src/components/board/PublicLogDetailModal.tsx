import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Modal } from '@components/common'
import type { ProgressLogResponse } from '@/types'

interface PublicLogDetailModalProps {
  log: ProgressLogResponse | null
  isOpen: boolean
  onClose: () => void
}

/**
 * 공개 진행 로그 상세 모달
 * 작성자, 내용, 이미지 갤러리(라이트박스) 표시
 */
export function PublicLogDetailModal({ log, isOpen, onClose }: PublicLogDetailModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!log) return null

  const { userNickname, miniatureTitle, content, createdAt, images } = log
  const hasImages = images && images.length > 0

  const relativeTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  })

  const lightboxSlides = hasImages
    ? images.map((img) => ({ src: img.imageUrl, alt: img.fileName }))
    : []

  const handleThumbnailClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={miniatureTitle} size="lg">
        {/* 작성자 및 시간 */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="font-medium text-charcoal-700 dark:text-cream-200">
            {userNickname}
          </span>
          <span className="text-stone-300 dark:text-charcoal-400">·</span>
          <span className="text-stone-400 dark:text-stone-500">{relativeTime}</span>
        </div>

        {/* 내용 */}
        <div className="mb-5 whitespace-pre-wrap text-sm leading-relaxed text-charcoal-700 dark:text-cream-200">
          {content}
        </div>

        {/* 이미지 갤러리 */}
        {hasImages && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {images.map((img, index) => (
              <button
                key={img.id}
                type="button"
                onClick={() => handleThumbnailClick(index)}
                className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <img
                  src={img.imageUrl}
                  alt={img.fileName}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-charcoal-900/0 transition-colors group-hover:bg-charcoal-900/10" />
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* 라이트박스 */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  )
}
