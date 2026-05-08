import type {
  CSSProperties,
  ElementType,
  ImgHTMLAttributes,
  ReactElement,
  ReactNode
} from 'react'

export type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error'

export type PlaceholderKind = 'empty' | 'skeleton' | 'blur' | 'color'

export type FadeType = 'fade' | 'blur-in' | 'slide-up' | 'scale' | 'curtain'

export type ImageFit = CSSProperties['objectFit']

export interface FadeOptions {
  duration?: number | string
  easing?: string
  delay?: number | string
}

export interface LazyOptions {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
  initialInView?: boolean
}

export interface PlaceholderRenderState {
  status: ImageStatus
  src: string
  hasLoaded: boolean
  hasFailed: boolean
}

export interface UseImageOptions {
  src?: string
  srcSet?: string
  sizes?: string
  enabled?: boolean
  decode?: boolean
  retry?: number
  timeout?: number
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
}

export interface UseImageResult {
  status: ImageStatus
  error: Error | null
  image: HTMLImageElement | null
  isIdle: boolean
  isLoading: boolean
  isLoaded: boolean
  isError: boolean
  reload: () => void
}

export interface SharedVisualProps {
  fade?: boolean | FadeOptions
  fadeType?: FadeType
  duration?: number | string
  easing?: string
  delay?: number | string
  placeholder?: PlaceholderKind | ReactNode | null
  blurDataURL?: string
  color?: string
  renderPlaceholder?: (state: PlaceholderRenderState) => ReactNode
  renderError?: (state: PlaceholderRenderState) => ReactNode
  containerClassName?: string
  containerStyle?: CSSProperties
}

export interface ImageProps
  extends Omit<
      ImgHTMLAttributes<HTMLImageElement>,
      | 'src'
      | 'srcSet'
      | 'sizes'
      | 'loading'
      | 'width'
      | 'height'
      | 'placeholder'
    >,
    SharedVisualProps {
  src: string
  alt: string
  srcSet?: string
  sizes?: string
  width?: number | string
  height?: number | string
  aspectRatio?: number | string
  fit?: ImageFit
  position?: CSSProperties['objectPosition']
  lazy?: boolean | LazyOptions
  loading?: 'eager' | 'lazy'
  decode?: boolean
  imageClassName?: string
  imageStyle?: CSSProperties
}

export interface BackgroundImageProps extends SharedVisualProps {
  src: string
  srcSet?: string
  sizes?: string
  width?: number | string
  height?: number | string
  aspectRatio?: number | string
  fit?: CSSProperties['backgroundSize']
  position?: CSSProperties['backgroundPosition']
  repeat?: CSSProperties['backgroundRepeat']
  lazy?: boolean | LazyOptions
  as?: ElementType
  asChild?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
  decode?: boolean
  retry?: number
  timeout?: number
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
  referrerPolicy?: ImgHTMLAttributes<HTMLImageElement>['referrerPolicy']
}

export interface PictureSource {
  srcSet: string
  media?: string
  sizes?: string
  type?: string
  width?: number
  height?: number
}

export interface PictureProps
  extends Omit<ImageProps, 'srcSet' | 'children'> {
  sources: PictureSource[]
}

export interface ImageLoaderState extends PlaceholderRenderState {
  shouldShowLoader: boolean
  image: HTMLImageElement | null
  error: Error | null
}

export interface ImageLoaderProps
  extends Omit<UseImageOptions, 'enabled'> {
  lazy?: boolean | LazyOptions
  duration?: number | string
  children: (state: ImageLoaderState) => ReactNode
}

export type AsChildElement = ReactElement<{
  className?: string
  style?: CSSProperties
}>
