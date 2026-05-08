import { useEffect, useMemo, useState } from 'react'
import type { ImageLoaderProps, LazyOptions } from '../types'
import { useImage } from '../hooks/useImage'
import { useInView } from '../hooks/useInView'
import { toMilliseconds } from '../utils/css'
import { useImageConfig } from '../config'

function isLazyOptions(lazy: ImageLoaderProps['lazy']): lazy is LazyOptions {
  return typeof lazy === 'object' && lazy !== null
}

export function ImageLoader({
  src,
  srcSet,
  sizes,
  lazy,
  duration,
  children,
  ...options
}: ImageLoaderProps) {
  const config = useImageConfig()
  const resolvedLazy = lazy === undefined ? config.lazy ?? false : lazy
  const resolvedDuration = duration ?? config.duration ?? 300
  const resolvedDecode = options.decode ?? config.decode
  const lazyOptions = isLazyOptions(resolvedLazy) ? resolvedLazy : undefined
  const shouldUseObserver = Boolean(resolvedLazy)
  const { ref, inView } = useInView<HTMLDivElement>({
    ...lazyOptions,
    disabled: !shouldUseObserver
  })
  const enabled = !shouldUseObserver || inView
  const image = useImage({ src, srcSet, sizes, enabled, ...options, decode: resolvedDecode })
  const [shouldShowLoader, setShouldShowLoader] = useState(true)

  useEffect(() => {
    setShouldShowLoader(true)
  }, [src, srcSet, sizes])

  useEffect(() => {
    if (image.status !== 'loaded') return

    const timeout = setTimeout(() => {
      setShouldShowLoader(false)
    }, toMilliseconds(resolvedDuration))

    return () => clearTimeout(timeout)
  }, [resolvedDuration, image.status])

  const state = useMemo(
    () => ({
      status: image.status,
      src: src ?? '',
      hasLoaded: image.status === 'loaded',
      hasFailed: image.status === 'error',
      shouldShowLoader,
      image: image.image,
      error: image.error
    }),
    [image.error, image.image, image.status, shouldShowLoader, src]
  )

  return (
    <div ref={ref} data-ribif-loader="">
      {children(state)}
    </div>
  )
}
