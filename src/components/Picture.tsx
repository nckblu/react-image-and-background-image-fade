import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import type { FadeType, ImageStatus, PictureProps, PlaceholderRenderState } from '../types'
import { Placeholder } from './Placeholder'
import { cx, getAspectRatio, getTransitionStyle, toCssSize } from '../utils/css'
import { useImageConfig } from '../config'

function isNumericDimension(value: number | string | undefined): value is number {
  return typeof value === 'number'
}

export const Picture = forwardRef<HTMLImageElement, PictureProps>(function Picture(
  {
    sources,
    src,
    alt,
    sizes,
    width,
    height,
    aspectRatio,
    fit,
    position,
    loading,
    lazy,
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
  const [status, setStatus] = useState<ImageStatus>('loading')

  useEffect(() => {
    setStatus('loading')
  }, [src, sources])

  useEffect(() => {
    const image = imageRef.current
    if (!image) return

    if (image.complete && image.naturalWidth > 0) {
      setStatus('loaded')
    } else if (image.complete && image.naturalWidth === 0) {
      setStatus('error')
    }
  }, [src])

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

  return (
    <span
      className={cx('ribif-root', containerClassName)}
      data-status={status}
      style={rootStyle}
    >
      <picture>
        {sources.map((source, index) => (
          <source
            key={`${source.srcSet}-${source.media ?? ''}-${source.type ?? ''}-${index}`}
            height={source.height}
            media={source.media}
            sizes={source.sizes ?? sizes}
            srcSet={source.srcSet}
            type={source.type}
            width={source.width}
          />
        ))}
        <img
          {...imgProps}
          ref={handleRef}
          alt={alt}
          className={cx('ribif-image', className, imageClassName)}
          data-loaded={status === 'loaded'}
          data-fade-type={resolvedFadeType !== 'fade' ? resolvedFadeType : undefined}
          decoding={decoding ?? (resolvedDecode ? 'async' : 'auto')}
          height={isNumericDimension(height) ? height : undefined}
          loading={loading ?? (resolvedLazy ? 'lazy' : 'eager')}
          onError={handleError}
          onLoad={handleLoad}
          sizes={sizes}
          src={src}
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
      </picture>
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
