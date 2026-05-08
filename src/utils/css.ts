import type { CSSProperties } from 'react'
import type { FadeOptions } from '../types'

export function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

export function toCssTime(value: number | string | undefined, fallback = '300ms'): string {
  if (value === undefined) return fallback
  return typeof value === 'number' ? `${value}ms` : value
}

export function toMilliseconds(value: number | string | undefined, fallback = 300): number {
  if (value === undefined) return fallback
  if (typeof value === 'number') return value

  const match = value.trim().match(/^([\d.]+)\s*(ms|s)$/)
  if (!match) return fallback

  const amount = Number.parseFloat(match[1] ?? '0')
  return match[2] === 's' ? amount * 1000 : amount
}

export function getAspectRatio(
  width?: number | string,
  height?: number | string,
  aspectRatio?: number | string
): string | undefined {
  if (aspectRatio !== undefined) {
    return typeof aspectRatio === 'number' ? String(aspectRatio) : aspectRatio
  }

  if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
    return `${width} / ${height}`
  }

  return undefined
}

export function getFadeOptions(
  fade: boolean | FadeOptions | undefined,
  duration?: number | string,
  easing?: string,
  delay?: number | string
): Required<FadeOptions> {
  if (typeof fade === 'object') {
    return {
      duration: fade.duration ?? duration ?? 300,
      easing: fade.easing ?? easing ?? 'ease',
      delay: fade.delay ?? delay ?? 0
    }
  }

  return {
    duration: duration ?? 300,
    easing: easing ?? 'ease',
    delay: delay ?? 0
  }
}

export function getTransitionStyle(
  fade: boolean | FadeOptions | undefined,
  duration?: number | string,
  easing?: string,
  delay?: number | string
): CSSProperties {
  if (fade === false) {
    return {
      '--ribif-duration': '0ms',
      '--ribif-delay': '0ms',
      '--ribif-easing': 'linear'
    } as CSSProperties
  }

  const options = getFadeOptions(fade, duration, easing, delay)
  return {
    '--ribif-duration': toCssTime(options.duration),
    '--ribif-delay': toCssTime(options.delay, '0ms'),
    '--ribif-easing': options.easing
  } as CSSProperties
}

export function cx(...classes: Array<string | false | null | undefined>): string | undefined {
  const className = classes.filter(Boolean).join(' ')
  return className || undefined
}
