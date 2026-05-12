import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import type { FadeType, ImageProps, ImageStatus, LazyOptions, PlaceholderRenderState } from '../types'
import { Placeholder } from './Placeholder'
import { cx, getAspectRatio, getTransitionStyle, toCssSize } from '../utils/css'
import { useInView } from '../hooks/useInView'
import { useImageConfig } from '../config'

function isLazyOptions(lazy: ImageProps['lazy']): lazy is LazyOptions {
  return typeof lazy === 'object' && lazy !== null
}

function isNumericDimension(value: number | string | undefined): value is number {
  return typeof value === 'number'
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    srcSet,
    sizes,
    width,
    height,
    aspectRatio,
    fit,
    position,
    lazy,
    loading,
    decode,
    decoding,
    fade,
    fadeType,
    duration,
    easing,
    delay,
    placeholder,
    blurDataURL,
    color,
    skeleton,
    renderPlaceholder,
    renderError,
    containerClassName,
    containerStyle,
    placeholderClassName,
    placeholderStyle,
    imageClassName,
    imageStyle,
    className,
    style,
    onLoad,
    onError,
    skipCache,
    ...imgProps
  },
  forwardedRef
) {
  const config = useImageConfig()
  const resolvedLazy = lazy === undefined ? config.lazy ?? false : lazy
  const resolvedDecode = decode ?? config.decode ?? true
  const resolvedFade = fade === undefined ? config.fade ?? true : fade
  const resolvedDuration = duration ?? config.duration
  const resolvedEasing = easing ?? config.easing
  const resolvedPlaceholder = placeholder === undefined ? config.placeholder ?? 'skeleton' : placeholder
  const resolvedColor = color ?? config.color
  const resolvedSkeleton = skeleton ?? config.skeleton
  const resolvedRenderPlaceholder = renderPlaceholder ?? config.renderPlaceholder
  const resolvedRenderError = renderError ?? config.renderError
  const resolvedFadeType: FadeType = fadeType ?? config.fadeType ?? 'fade'
  const imageRef = useRef<HTMLImageElement | null>(null)
  const lazyOptions = isLazyOptions(resolvedLazy) ? resolvedLazy : undefined
  const shouldUseObserver = Boolean(lazyOptions)
  const { ref: inViewRef, inView } = useInView<HTMLSpanElement>({
    ...lazyOptions,
    disabled: !shouldUseObserver
  })
  const shouldRenderSource = !shouldUseObserver || inView
  const [status, setStatus] = useState<ImageStatus>(shouldRenderSource ? 'loading' : 'idle')

  useEffect(() => {
    setStatus(shouldRenderSource ? 'loading' : 'idle')
  }, [shouldRenderSource, src, srcSet, sizes])

  useEffect(() => {
    const image = imageRef.current
    if (!image || !shouldRenderSource || skipCache) return

    if (image.complete && image.naturalWidth > 0) {
      setStatus('loaded')
    } else if (image.complete && image.naturalWidth === 0) {
      setStatus('error')
    }
  }, [shouldRenderSource, skipCache, src])

  const placeholderState: PlaceholderRenderState = useMemo(
    () => ({
      status,
      src,
      hasLoaded: status === 'loaded',
      hasFailed: status === 'error'
    }),
    [src, status]
  )

  const handleRef = (node: HTMLImageElement | null) => {
    imageRef.current = node

    if (typeof forwardedRef === 'function') {
      forwardedRef(node)
    } else if (forwardedRef) {
      forwardedRef.current = node
    }
  }

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded')
    onLoad?.(event)
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setStatus('error')
    onError?.(event)
  }

  const ratio = getAspectRatio(width, height, aspectRatio)
  const rootStyle = {
    width: toCssSize(width),
    height: ratio ? undefined : toCssSize(height),
    aspectRatio: ratio,
    ...getTransitionStyle(resolvedFade, resolvedDuration, resolvedEasing, delay),
    ...containerStyle
  }

  const resolvedLoading = loading ?? (resolvedLazy ? 'lazy' : 'eager')
  const resolvedDecoding = decoding ?? (resolvedDecode ? 'async' : 'auto')

  return (
    <span
      ref={inViewRef}
      className={cx('ribif-root', containerClassName)}
      style={rootStyle}
      data-status={status}
    >
      <img
        {...imgProps}
        ref={handleRef}
        alt={alt}
        className={cx('ribif-image', className, imageClassName)}
        data-loaded={status === 'loaded'}
        data-fade-type={resolvedFadeType !== 'fade' ? resolvedFadeType : undefined}
        decoding={resolvedDecoding}
        height={isNumericDimension(height) ? height : undefined}
        loading={resolvedLoading}
        onError={handleError}
        onLoad={handleLoad}
        sizes={shouldRenderSource ? sizes : undefined}
        src={shouldRenderSource ? src : undefined}
        srcSet={shouldRenderSource ? srcSet : undefined}
        style={{
          width: ratio || width !== undefined ? '100%' : undefined,
          height: ratio || height !== undefined ? '100%' : undefined,
          objectFit: fit,
          objectPosition: position,
          ...style,
          ...imageStyle
        }}
        width={isNumericDimension(width) ? width : undefined}
      />
      <Placeholder
        placeholder={resolvedPlaceholder}
        blurDataURL={blurDataURL}
        color={resolvedColor}
        skeleton={resolvedSkeleton}
        renderPlaceholder={resolvedRenderPlaceholder}
        renderError={resolvedRenderError}
        placeholderClassName={placeholderClassName}
        placeholderStyle={placeholderStyle}
        state={placeholderState}
      />
    </span>
  )
})
