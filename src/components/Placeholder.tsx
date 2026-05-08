import type { ReactNode } from 'react'
import type { PlaceholderRenderState, SharedVisualProps } from '../types'
import { cx } from '../utils/css'

export interface PlaceholderProps
  extends Pick<
    SharedVisualProps,
    'placeholder' | 'blurDataURL' | 'color' | 'renderPlaceholder' | 'renderError'
  > {
  state: PlaceholderRenderState
}

export function Placeholder({
  placeholder = 'skeleton',
  blurDataURL,
  color,
  renderPlaceholder,
  renderError,
  state
}: PlaceholderProps): ReactNode {
  if (state.status === 'error' && renderError) {
    return <div className="ribif-placeholder ribif-error">{renderError(state)}</div>
  }

  if (placeholder === null || placeholder === 'empty') {
    return null
  }

  if (renderPlaceholder) {
    return <div className="ribif-placeholder">{renderPlaceholder(state)}</div>
  }

  if (placeholder === 'blur' && blurDataURL) {
    return (
      <div
        aria-hidden="true"
        className="ribif-placeholder ribif-placeholder-blur"
        style={{ backgroundImage: `url("${blurDataURL}")` }}
      />
    )
  }

  if (placeholder === 'color') {
    return (
      <div
        aria-hidden="true"
        className="ribif-placeholder ribif-placeholder-color"
        style={{ backgroundColor: color ?? '#eee' }}
      />
    )
  }

  if (typeof placeholder !== 'string') {
    return <div className="ribif-placeholder">{placeholder}</div>
  }

  return (
    <div
      aria-hidden="true"
      className={cx('ribif-placeholder', 'ribif-placeholder-skeleton')}
      style={{ backgroundColor: color }}
    />
  )
}
