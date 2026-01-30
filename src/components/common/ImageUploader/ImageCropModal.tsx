import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import type { Area, Point } from 'react-easy-crop'
import { Modal } from '@components/common/Modal/Modal'
import { cropImage } from '@utils/imageProcess'

interface ImageCropModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 편집할 이미지의 object URL */
  imageSrc: string
  /** 원본 파일명 (결과 파일명에 사용) */
  fileName: string
  /** 편집 완료 후 결과 File 반환 */
  onComplete: (file: File) => void
}

/** 'original'은 이미지 원본 비율을 의미하는 센티넬 값 */
const ORIGINAL = 'original' as const

type AspectValue = number | typeof ORIGINAL

const ASPECT_PRESETS: { label: string; value: AspectValue }[] = [
  { label: '원본', value: ORIGINAL },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:4', value: 3 / 4 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
]

/**
 * 이미지 crop/rotate/zoom 편집 모달
 * react-easy-crop 기반, 비율 프리셋 선택 지원
 */
export function ImageCropModal({
  isOpen,
  onClose,
  imageSrc,
  fileName,
  onComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspectPreset, setAspectPreset] = useState<AspectValue>(ORIGINAL)
  const [originalAspect, setOriginalAspect] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  // 실제 Cropper에 전달할 aspect 값 계산
  const resolvedAspect = aspectPreset === ORIGINAL ? originalAspect : aspectPreset

  const onMediaLoaded = useCallback((mediaSize: { naturalWidth: number; naturalHeight: number }) => {
    setOriginalAspect(mediaSize.naturalWidth / mediaSize.naturalHeight)
  }, [])

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360)
  }, [])

  const handleApply = useCallback(async () => {
    if (!croppedAreaPixels) return

    setIsApplying(true)
    try {
      const resultFile = await cropImage(imageSrc, croppedAreaPixels, rotation)
      // 원본 파일명 기반으로 이름 설정
      const ext = resultFile.name.match(/\.[^.]+$/)?.[0] || '.jpg'
      const baseName = fileName.replace(/\.[^.]+$/, '')
      const namedFile = new File([resultFile], `${baseName}${ext}`, {
        type: resultFile.type,
      })
      onComplete(namedFile)
      onClose()
    } catch (error) {
      console.error('이미지 crop 실패:', error)
    } finally {
      setIsApplying(false)
    }
  }, [croppedAreaPixels, rotation, imageSrc, fileName, onComplete, onClose])

  const handleAspectChange = useCallback((value: AspectValue) => {
    setAspectPreset(value)
    // 비율 변경 시 crop 위치 초기화
    setCrop({ x: 0, y: 0 })
  }, [])

  // 모달이 닫힐 때 상태 초기화
  const handleClose = useCallback(() => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setAspectPreset(ORIGINAL)
    setCroppedAreaPixels(null)
    onClose()
  }, [onClose])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="이미지 편집" size="xl">
      <div className="space-y-4">
        {/* Crop 영역 */}
        <div
          className="relative w-full overflow-hidden rounded-lg bg-charcoal-900"
          style={{ height: 'min(400px, 60vh)' }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={resolvedAspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onMediaLoaded={onMediaLoaded}
          />
        </div>

        {/* 비율 프리셋 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 dark:text-stone-400">비율</span>
          {ASPECT_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleAspectChange(preset.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                aspectPreset === preset.value
                  ? 'bg-forest-600 text-white'
                  : 'border border-cream-300 text-stone-600 hover:bg-cream-100 dark:border-charcoal-600 dark:text-stone-400 dark:hover:bg-charcoal-600'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* 컨트롤 영역 */}
        <div className="flex items-center gap-4">
          {/* 회전 버튼 */}
          <button
            type="button"
            onClick={handleRotate}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cream-300 text-stone-600 transition-colors hover:bg-cream-100 dark:border-charcoal-600 dark:text-stone-400 dark:hover:bg-charcoal-600"
            title="90도 회전"
          >
            <RotateIcon className="h-5 w-5" />
          </button>

          {/* 줌 슬라이더 */}
          <div className="flex flex-1 items-center gap-3">
            <span className="text-xs text-stone-500 dark:text-stone-400">줌</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-forest-600"
            />
            <span className="w-10 text-right text-xs text-stone-500 dark:text-stone-400">
              {zoom.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isApplying}
            className="rounded-lg border border-cream-300 px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-cream-100 dark:border-charcoal-600 dark:text-stone-400 dark:hover:bg-charcoal-600"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={isApplying || !croppedAreaPixels}
            className="rounded-lg bg-forest-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-700 disabled:opacity-50"
          >
            {isApplying ? '처리 중...' : '적용'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

function RotateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h5M20 20v-5h-5M4.75 8.5A8 8 0 0119.25 15.5M19.25 15.5A8 8 0 014.75 8.5"
      />
    </svg>
  )
}
