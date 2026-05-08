import type { UseImageOptions } from '../types'

const loadedImages = new Set<string>()
const failedImages = new Map<string, Error>()
const pendingImages = new Map<string, Promise<HTMLImageElement>>()

export function getImageCacheKey(options: UseImageOptions): string {
  return [
    options.src ?? '',
    options.srcSet ?? '',
    options.sizes ?? '',
    options.crossOrigin ?? '',
    options.referrerPolicy ?? ''
  ].join('|')
}

export function getCachedImageStatus(options: UseImageOptions): 'loaded' | 'error' | undefined {
  const key = getImageCacheKey(options)
  if (loadedImages.has(key)) return 'loaded'
  if (failedImages.has(key)) return 'error'
  return undefined
}

export function getCachedImageError(options: UseImageOptions): Error | null {
  return failedImages.get(getImageCacheKey(options)) ?? null
}

export function preloadImage(options: string | UseImageOptions): Promise<HTMLImageElement> {
  const imageOptions = typeof options === 'string' ? { src: options } : options
  const key = getImageCacheKey(imageOptions)

  if (!imageOptions.src) {
    return Promise.reject(new Error('preloadImage requires a src.'))
  }
  const src = imageOptions.src

  if (typeof window === 'undefined' || typeof window.Image === 'undefined') {
    return Promise.resolve(undefined as unknown as HTMLImageElement)
  }

  if (loadedImages.has(key)) {
    const image = new window.Image()
    image.src = src
    return Promise.resolve(image)
  }

  const pending = pendingImages.get(key)
  if (pending) return pending

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image()
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const cleanup = () => {
      image.onload = null
      image.onerror = null
      if (timeoutId) clearTimeout(timeoutId)
      pendingImages.delete(key)
    }

    image.onload = async () => {
      try {
        if (imageOptions.decode !== false && typeof image.decode === 'function') {
          await image.decode()
        }
      } catch {
        // Some browsers reject decode for SVGs or cached images. The load event still won.
      }

      cleanup()
      failedImages.delete(key)
      loadedImages.add(key)
      resolve(image)
    }

    image.onerror = () => {
      const error = new Error(`Failed to load image: ${src}`)
      cleanup()
      failedImages.set(key, error)
      reject(error)
    }

    if (imageOptions.timeout && imageOptions.timeout > 0) {
      timeoutId = setTimeout(() => {
        const error = new Error(`Timed out loading image: ${src}`)
        cleanup()
        failedImages.set(key, error)
        reject(error)
      }, imageOptions.timeout)
    }

    if (imageOptions.crossOrigin !== undefined) {
      image.crossOrigin = imageOptions.crossOrigin
    }

    if (imageOptions.referrerPolicy) {
      image.referrerPolicy = imageOptions.referrerPolicy
    }

    if (imageOptions.sizes) {
      image.sizes = imageOptions.sizes
    }

    if (imageOptions.srcSet) {
      image.srcset = imageOptions.srcSet
    }

    image.src = src
  })

  pendingImages.set(key, promise)
  return promise
}

export function preloadImages(images: Array<string | UseImageOptions>): Promise<HTMLImageElement[]> {
  return Promise.all(images.map(image => preloadImage(image)))
}

export function preconnectImage(url: string): HTMLLinkElement | null {
  if (typeof document === 'undefined') return null

  const origin = new URL(url, window.location.href).origin
  const existing = document.head.querySelector<HTMLLinkElement>(
    `link[rel="preconnect"][href="${origin}"]`
  )

  if (existing) return existing

  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  document.head.appendChild(link)
  return link
}

export function clearImageCache(): void {
  loadedImages.clear()
  failedImages.clear()
  pendingImages.clear()
}
