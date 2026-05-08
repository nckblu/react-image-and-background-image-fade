/**
 * Curated easing presets for image fade transitions.
 * Use these with the `easing` prop or `ImageConfigProvider`.
 *
 * @example
 * ```tsx
 * import { Image, easings } from 'react-image-and-background-image-fade'
 *
 * <Image src="/photo.jpg" alt="Photo" easing={easings.apple} />
 * ```
 */
export const easings = {
  /** Standard CSS ease-out — quick entrance, gentle stop. */
  default: 'ease-out',

  /** Google Material Design deceleration curve. */
  material: 'cubic-bezier(0.2, 0, 0, 1)',

  /** Apple iOS fluid animation curve. */
  apple: 'cubic-bezier(0.16, 1, 0.3, 1)',

  /** Material emphasized — balanced entrance/exit. */
  emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /** Punchy, fast-out with a slow landing. */
  sharp: 'cubic-bezier(0.85, 0, 0.15, 1)',

  /** Slight overshoot for a lively, organic feel. */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

  /** Cinematic — slow start, accelerating reveal. */
  cinematic: 'cubic-bezier(0.22, 0.68, 0, 1)',

  /** Dramatic — heavy deceleration for heroic entrances. */
  dramatic: 'cubic-bezier(0.6, 0, 0, 1)',
} as const

export type EasingPreset = keyof typeof easings
