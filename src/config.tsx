import { createContext, useContext } from 'react'
import type {
  FadeOptions,
  FadeType,
  LazyOptions,
  PlaceholderKind,
  PlaceholderRenderState,
  SkeletonOptions
} from './types'
import type { ReactNode } from 'react'

export interface ImageConfig {
  decode?: boolean
  duration?: number | string
  easing?: string
  fade?: boolean | FadeOptions
  fadeType?: FadeType
  lazy?: boolean | LazyOptions
  placeholder?: PlaceholderKind | ReactNode | null
  color?: string
  skeleton?: SkeletonOptions
  renderPlaceholder?: (state: PlaceholderRenderState) => ReactNode
  renderError?: (state: PlaceholderRenderState) => ReactNode
}

export interface ImageConfigProviderProps {
  value: ImageConfig
  children: ReactNode
}

const ImageConfigContext = createContext<ImageConfig>({})

export function ImageConfigProvider({ value, children }: ImageConfigProviderProps) {
  return <ImageConfigContext.Provider value={value}>{children}</ImageConfigContext.Provider>
}

export function useImageConfig(): ImageConfig {
  return useContext(ImageConfigContext)
}
