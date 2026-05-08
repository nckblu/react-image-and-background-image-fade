export interface ImageUrlBuilderOptions {
  src: string
  width: number
  quality?: number
  format?: string
}

export type ImageUrlBuilder = (options: ImageUrlBuilderOptions) => string

export interface CreateSrcSetOptions {
  src: string
  widths?: number[]
  quality?: number
  format?: string
  loader?: ImageUrlBuilder
}

export interface CreateSizesOptions {
  defaultSize?: string
  breakpoints?: Array<{
    media: string
    size: string
  }>
}

export const defaultImageWidths = [
  320,
  480,
  640,
  750,
  828,
  1080,
  1200,
  1600,
  1920,
  2048,
  3840
]

export function appendImageParams({ src, width, quality, format }: ImageUrlBuilderOptions): string {
  const url = new URL(src, 'https://ribif.local')
  url.searchParams.set('w', String(width))

  if (quality !== undefined) {
    url.searchParams.set('q', String(quality))
  }

  if (format) {
    url.searchParams.set('fm', format)
  }

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return url.toString()
  }

  return `${url.pathname}${url.search}${url.hash}`
}

export function createSrcSet({
  src,
  widths = defaultImageWidths,
  quality,
  format,
  loader = appendImageParams
}: CreateSrcSetOptions): string {
  return [...new Set(widths)]
    .filter(width => Number.isFinite(width) && width > 0)
    .sort((a, b) => a - b)
    .map(width => `${loader({ src, width, quality, format })} ${width}w`)
    .join(', ')
}

export function createSizes({
  defaultSize = '100vw',
  breakpoints = []
}: CreateSizesOptions = {}): string {
  return [...breakpoints.map(({ media, size }) => `${media} ${size}`), defaultSize].join(', ')
}
