import type { Area } from 'react-easy-crop'

interface ProcessOptions {
  /** 긴 변 최대 크기 (기본: 1600px) */
  maxSize?: number
  /** 출력 품질 0~1 (기본: 0.8) */
  quality?: number
}

// WebP 지원 여부 캐시
let webpSupportCache: boolean | null = null

/**
 * 브라우저의 WebP 인코딩 지원 여부를 런타임 감지한다.
 * 결과는 캐싱되어 이후 호출 시 즉시 반환된다.
 */
export function getOutputFormat(): Promise<'image/webp' | 'image/jpeg'> {
  if (webpSupportCache !== null) {
    return Promise.resolve(webpSupportCache ? 'image/webp' : 'image/jpeg')
  }

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const dataUrl = canvas.toDataURL('image/webp')
    const supported = dataUrl.startsWith('data:image/webp')
    webpSupportCache = supported
    resolve(supported ? 'image/webp' : 'image/jpeg')
  })
}

/**
 * createImageBitmap로 EXIF orientation이 보정된 이미지를 로드한다.
 * 미지원 환경에서는 Image 엘리먼트로 폴백한다.
 */
export async function loadImage(
  file: File
): Promise<{ source: ImageBitmap | HTMLImageElement; width: number; height: number }> {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(file)
    return { source: bitmap, width: bitmap.width, height: bitmap.height }
  }

  // 폴백: Image 엘리먼트
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ source: img, width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('이미지 로드 실패'))
    }
    img.src = url
  })
}

/**
 * 이미지 파일을 자동 압축한다 (EXIF 보정 → 리사이즈 → 포맷 변환).
 * 실패 시 원본 파일을 그대로 반환한다.
 */
export async function processImage(
  file: File,
  options: ProcessOptions = {}
): Promise<File> {
  const { maxSize = 1600, quality = 0.8 } = options

  try {
    const { source, width, height } = await loadImage(file)
    const format = await getOutputFormat()

    // 리사이즈 비율 계산 (긴 변 기준)
    const longerSide = Math.max(width, height)
    const scale = longerSide > maxSize ? maxSize / longerSide : 1

    const outWidth = Math.round(width * scale)
    const outHeight = Math.round(height * scale)

    // 리사이즈 불필요 + 이미 적합한 포맷이면 원본 반환
    if (scale === 1 && file.type === format) {
      return file
    }

    const canvas = document.createElement('canvas')
    canvas.width = outWidth
    canvas.height = outHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(source, 0, 0, outWidth, outHeight)

    const blob = await canvasToBlob(canvas, format, quality)
    const ext = format === 'image/webp' ? '.webp' : '.jpg'
    const baseName = file.name.replace(/\.[^.]+$/, '')
    return blobToFile(blob, `${baseName}${ext}`, format)
  } catch (error) {
    console.error('이미지 처리 실패, 원본 사용:', error)
    return file
  }
}

/**
 * crop 영역 + 회전을 적용하여 이미지를 잘라낸다.
 * imageSrc는 object URL 또는 data URL이어야 한다.
 */
export async function cropImage(
  imageSrc: string,
  cropArea: Area,
  rotation: number = 0,
  options: ProcessOptions = {}
): Promise<File> {
  const { maxSize = 1600, quality = 0.8 } = options
  const format = await getOutputFormat()

  const image = await loadImageFromSrc(imageSrc)

  // 회전 적용 시 캔버스 크기 계산
  const radians = (rotation * Math.PI) / 180
  const sin = Math.abs(Math.sin(radians))
  const cos = Math.abs(Math.cos(radians))
  const rotatedWidth = image.naturalWidth * cos + image.naturalHeight * sin
  const rotatedHeight = image.naturalWidth * sin + image.naturalHeight * cos

  // 회전 적용 캔버스
  const rotCanvas = document.createElement('canvas')
  rotCanvas.width = rotatedWidth
  rotCanvas.height = rotatedHeight
  const rotCtx = rotCanvas.getContext('2d')!
  rotCtx.translate(rotatedWidth / 2, rotatedHeight / 2)
  rotCtx.rotate(radians)
  rotCtx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)

  // crop 영역 추출
  const { x, y, width, height } = cropArea

  // 리사이즈 비율 계산
  const longerSide = Math.max(width, height)
  const scale = longerSide > maxSize ? maxSize / longerSide : 1
  const outWidth = Math.round(width * scale)
  const outHeight = Math.round(height * scale)

  const cropCanvas = document.createElement('canvas')
  cropCanvas.width = outWidth
  cropCanvas.height = outHeight
  const cropCtx = cropCanvas.getContext('2d')!
  cropCtx.drawImage(rotCanvas, x, y, width, height, 0, 0, outWidth, outHeight)

  const blob = await canvasToBlob(cropCanvas, format, quality)
  const ext = format === 'image/webp' ? '.webp' : '.jpg'
  return blobToFile(blob, `cropped${ext}`, format)
}

/**
 * Blob을 File 객체로 변환한다.
 */
export function blobToFile(blob: Blob, fileName: string, type?: string): File {
  return new File([blob], fileName, { type: type || blob.type })
}

// --- 내부 헬퍼 ---

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas toBlob 실패'))
      },
      format,
      quality
    )
  })
}

function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('이미지 로드 실패'))
    img.crossOrigin = 'anonymous'
    img.src = src
  })
}
