import { cloneElement, createElement, isValidElement, useMemo } from 'react'
import type { CSSProperties } from 'react'
import type {
  AsChildElement,
  BackgroundImageProps,
  FadeType,
  LazyOptions,
  PlaceholderRenderState
} from '../types'
import { useImage } from '../hooks/useImage'
import { useInView } from '../hooks/useInView'
import { Placeholder } from './Placeholder'
import { cx, getAspectRatio, getTransitionStyle, toCssSize } from '../utils/css'
import { useImageConfig } from '../config'

function isLazyOptions(lazy: BackgroundImageProps['lazy']): lazy is LazyOptions {
  return typeof lazy === 'object' && lazy !== null
}

export function BackgroundImage({
  src,
  srcSet,
  sizes,
  width,
  height,
  aspectRatio,
  fit = 'cover',
  position = 'center',
  repeat = 'no-repeat',
  lazy,
  as: Component = 'div',
  asChild = false,
  children,
  className,
  style,
  decode,
  retry,
  timeout,
  crossOrigin,
  referrerPolicy,
  fade,
  fadeType,
  duration,
  easing,
  delay,
  placeholder,
  blurDataURL,
  color,
  renderPlaceholder,
  renderError,
  containerClassName,
  containerStyle
}: BackgroundImageProps) {
  const config = useImageConfig()
  const resolvedLazy = lazy === undefined ? config.lazy ?? false : lazy
  const resolvedDecode = decode ?? config.decode ?? true
  const resolvedFade = fade === undefined ? config.fade ?? true : fade
  const resolvedDuration = duration ?? config.duration
  const resolvedEasing = easing ?? config.easing
  const resolvedPlaceholder = placeholder === undefined ? config.placeholder ?? 'skeleton' : placeholder
  const resolvedColor = color ?? config.color
  const resolvedRenderPlaceholder = renderPlaceholder ?? config.renderPlaceholder
  const resolvedRenderError = renderError ?? config.renderError
  const resolvedFadeType: FadeType = fadeType ?? config.fadeType ?? 'fade'
  const lazyOptions = isLazyOptions(resolvedLazy) ? resolvedLazy : undefined
  const shouldUseObserver = Boolean(resolvedLazy)
  const { ref, inView } = useInView<HTMLElement>({
    ...lazyOptions,
    disabled: !shouldUseObserver
  })
  const enabled = !shouldUseObserver || inView
  const image = useImage({
    src,
    srcSet,
    sizes,
    enabled,
    decode: resolvedDecode,
    retry,
    timeout,
    crossOrigin,
    referrerPolicy
  })

  const status = image.status
  const ratio = getAspectRatio(width, height, aspectRatio)
  const placeholderState: PlaceholderRenderState = useMemo(
    () => ({
      status,
      src,
      hasLoaded: status === 'loaded',
      hasFailed: status === 'error'
    }),
    [src, status]
  )

  const backgroundStyle: CSSProperties = {
    backgroundImage: status === 'loaded' ? `url("${src}")` : undefined,
    backgroundPosition: position,
    backgroundRepeat: repeat,
    backgroundSize: fit
  }

  const rootStyle: CSSProperties = {
    width: toCssSize(width),
    height: ratio ? undefined : toCssSize(height),
    aspectRatio: ratio,
    ...getTransitionStyle(resolvedFade, resolvedDuration, resolvedEasing, delay),
    ...containerStyle
  }

  const contentStyle: CSSProperties = {
    ...backgroundStyle,
    ...style
  }

  const child = isValidElement(children) ? (children as AsChildElement) : null

  const content = asChild && child
    ? cloneElement(child, {
        className: cx('ribif-background', className, child.props.className),
        style: {
          ...contentStyle,
          ...child.props.style
        },
        ...(resolvedFadeType !== 'fade' ? { 'data-fade-type': resolvedFadeType } : {})
      })
    : createElement(
        Component,
        {
          className: cx('ribif-background', className),
          style: contentStyle,
          ...(resolvedFadeType !== 'fade' ? { 'data-fade-type': resolvedFadeType } : {})
        },
        children
      )

  return (
    <div
      ref={ref as (node: HTMLDivElement | null) => void}
      className={cx('ribif-root', 'ribif-background-root', containerClassName)}
      style={rootStyle}
      data-status={status}
    >
      {content}
      <Placeholder
        placeholder={resolvedPlaceholder}
        blurDataURL={blurDataURL}
        color={resolvedColor}
        renderPlaceholder={resolvedRenderPlaceholder}
        renderError={resolvedRenderError}
        state={placeholderState}
      />
    </div>
  )
}
