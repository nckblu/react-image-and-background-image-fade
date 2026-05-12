import type { CSSProperties, ReactNode } from 'react'
import type { PlaceholderRenderState, SharedVisualProps, SkeletonOptions } from '../types'
import { cx } from '../utils/css'

export interface PlaceholderProps
  extends Pick<
    SharedVisualProps,
    | 'placeholder'
    | 'blurDataURL'
    | 'color'
    | 'skeleton'
    | 'renderPlaceholder'
    | 'renderError'
    | 'placeholderClassName'
    | 'placeholderStyle'
  > {
  state: PlaceholderRenderState
}

function toCssValue(value: number | string | undefined, unit = 'px') {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}${unit}` : value
}

function getSkeletonStyle(skeleton: SkeletonOptions | undefined): CSSProperties {
  if (!skeleton) return {}

  return {
    '--ribif-skeleton-bg': skeleton.baseColor,
    '--ribif-skeleton-highlight': skeleton.highlightColor,
    '--ribif-skeleton-accent': skeleton.accentColor,
    '--ribif-skeleton-sheen': skeleton.sheenColor,
    '--ribif-shimmer-speed': toCssValue(skeleton.speed, 'ms'),
    '--ribif-shimmer-angle': typeof skeleton.angle === 'number' ? `${skeleton.angle}deg` : skeleton.angle,
    '--ribif-shimmer-size': toCssValue(skeleton.size),
    '--ribif-skeleton-radius': toCssValue(skeleton.radius),
    '--ribif-skeleton-opacity': skeleton.opacity
  } as CSSProperties
}

export function Placeholder({
  placeholder = 'skeleton',
  blurDataURL,
  color,
  skeleton,
  renderPlaceholder,
  renderError,
  placeholderClassName,
  placeholderStyle,
  state
}: PlaceholderProps): ReactNode {
  if (state.status === 'error' && renderError) {
    return <div className={cx('ribif-placeholder', 'ribif-error', placeholderClassName)} style={placeholderStyle}>{renderError(state)}</div>
  }

  if (placeholder === null || placeholder === 'empty') {
    return null
  }

  if (renderPlaceholder) {
    return <div className={cx('ribif-placeholder', placeholderClassName)} style={placeholderStyle}>{renderPlaceholder(state)}</div>
  }

  if (placeholder === 'blur') {
    return (
      <div
        aria-hidden="true"
        className={cx('ribif-placeholder', 'ribif-placeholder-blur', placeholderClassName)}
        style={{
          backgroundImage: `url("${blurDataURL ?? state.src}")`,
          ...placeholderStyle
        }}
      />
    )
  }

  if (placeholder === 'color') {
    return (
      <div
        aria-hidden="true"
        className={cx('ribif-placeholder', 'ribif-placeholder-color', placeholderClassName)}
        style={{ backgroundColor: color ?? '#eee', ...placeholderStyle }}
      />
    )
  }

  if (typeof placeholder !== 'string') {
    return <div className={cx('ribif-placeholder', placeholderClassName)} style={placeholderStyle}>{placeholder}</div>
  }

  return (
    <div
      aria-hidden="true"
      className={cx('ribif-placeholder', 'ribif-placeholder-skeleton', placeholderClassName)}
      style={{
        backgroundColor: color,
        ...getSkeletonStyle(skeleton),
        ...placeholderStyle
      }}
    />
  )
}
