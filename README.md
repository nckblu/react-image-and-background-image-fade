# React Image and Background Image Fade

A modern React image loading toolkit for images, background images, responsive sources, placeholders, lazy loading, and fade transitions.

Version 2 is a ground-up rewrite for modern React. It keeps the original package ethos: make loaded images feel polished without forcing users into a specific design system.

## Install

```bash
npm install react-image-and-background-image-fade
```

Import the optional default styles once:

```tsx
import 'react-image-and-background-image-fade/styles.css'
```

## Quick Start

```tsx
import { Image } from 'react-image-and-background-image-fade'
import 'react-image-and-background-image-fade/styles.css'

export function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      alt="Nick"
      width={320}
      height={320}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      lazy
    />
  )
}
```

## What V2 Includes

- TypeScript-first API and bundled declarations.
- React 18.3+ and React 19 support.
- Hook-first image loading with `useImage`.
- `<Image>` for normal images with placeholders and fade-in.
- `<BackgroundImage>` for preloaded CSS background images.
- `<Picture>` for art direction and AVIF/WebP fallback sources.
- `<ImageLoader>` render prop for fully custom loading UIs.
- `ImageConfigProvider` for design-system defaults.
- Responsive helpers for generating `srcSet` and `sizes`.
- Native image attributes: `srcSet`, `sizes`, `loading`, `decoding`, `fetchPriority`, `crossOrigin`, and more.
- SSR-friendly markup for image and picture usage.
- No `styled-components`, `prop-types`, `image-preloader`, or visibility-sensor dependency.

## Image

```tsx
<Image
  src="/photo-1200.jpg"
  alt="Mountain sunrise"
  width={1200}
  height={800}
  srcSet="/photo-640.jpg 640w, /photo-1200.jpg 1200w, /photo-1800.jpg 1800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="skeleton"
  lazy
/>
```

Useful props:

| Prop | Type | Notes |
| --- | --- | --- |
| `src` | `string` | Required image URL. |
| `alt` | `string` | Required accessible alternative text. |
| `width`, `height` | `number \| string` | Used for stable layout and image attributes when numeric. |
| `aspectRatio` | `number \| string` | Overrides ratio derived from numeric width/height. |
| `srcSet`, `sizes` | `string` | Native responsive image support. |
| `lazy` | `boolean \| LazyOptions` | `true` uses native lazy loading; an object enables IntersectionObserver gating. |
| `placeholder` | `"skeleton" \| "blur" \| "color" \| "empty" \| ReactNode \| null` | Loading visual. |
| `fade` | `boolean \| FadeOptions` | Enables/disables transition or customizes it. |
| `fit`, `position` | CSS values | Maps to `object-fit` and `object-position`. |
| `renderPlaceholder` | function | Fully custom placeholder. |
| `renderError` | function | Fully custom error state. |

## BackgroundImage

```tsx
import { BackgroundImage } from 'react-image-and-background-image-fade'

export function Hero() {
  return (
    <BackgroundImage
      src="/hero.jpg"
      width="100%"
      aspectRatio="16 / 9"
      fit="cover"
      position="center"
      placeholder="color"
      color="#d8d8d8"
      lazy={{ rootMargin: '400px 0px' }}
    >
      <h1>Background images still get the good loading treatment.</h1>
    </BackgroundImage>
  )
}
```

Use `as` to choose the rendered element:

```tsx
<BackgroundImage src="/card.jpg" as="section">
  Content
</BackgroundImage>
```

Use `asChild` to apply the background behavior to your own element:

```tsx
<BackgroundImage src="/card.jpg" asChild>
  <article className="card">Content</article>
</BackgroundImage>
```

## Picture

```tsx
import { Picture } from 'react-image-and-background-image-fade'

<Picture
  src="/landscape.jpg"
  alt="Wide landscape"
  width={1200}
  height={800}
  sources={[
    { srcSet: '/landscape.avif 1200w', type: 'image/avif' },
    { srcSet: '/landscape.webp 1200w', type: 'image/webp' }
  ]}
/>
```

## Hooks

```tsx
import { useImage } from 'react-image-and-background-image-fade'

function Status({ src }: { src: string }) {
  const image = useImage({ src, retry: 1, timeout: 8000 })

  return <span>{image.status}</span>
}
```

`useImage` returns:

```ts
{
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error: Error | null
  image: HTMLImageElement | null
  isIdle: boolean
  isLoading: boolean
  isLoaded: boolean
  isError: boolean
  reload: () => void
}
```

## Shared Defaults

Use `ImageConfigProvider` when your app or design system wants consistent image behavior:

```tsx
import { ImageConfigProvider, Image } from 'react-image-and-background-image-fade'

export function App() {
  return (
    <ImageConfigProvider
      value={{
        placeholder: 'color',
        color: '#edf0f3',
        duration: 450,
        lazy: { rootMargin: '300px 0px' }
      }}
    >
      <Image src="/photo.jpg" alt="Photo" width={800} height={600} />
    </ImageConfigProvider>
  )
}
```

Component props always win over provider defaults.

## Responsive Helpers

Use `createSrcSet` and `createSizes` when you have an image service or CDN and want a clean responsive API:

```tsx
import { Image, createSizes, createSrcSet } from 'react-image-and-background-image-fade'

const src = 'https://images.example.com/photo.jpg'

<Image
  src={src}
  alt="Gallery item"
  width={1200}
  height={800}
  srcSet={createSrcSet({
    src,
    widths: [480, 768, 1200, 1600],
    quality: 80
  })}
  sizes={createSizes({
    breakpoints: [
      { media: '(max-width: 640px)', size: '100vw' },
      { media: '(max-width: 1200px)', size: '50vw' }
    ],
    defaultSize: '640px'
  })}
/>
```

For custom CDNs:

```tsx
createSrcSet({
  src: 'photo',
  widths: [400, 800, 1200],
  loader: ({ src, width }) => `https://cdn.example.com/${src}-${width}.webp`
})
```

## Preloading

```tsx
import { preloadImage, preloadImages, preconnectImage } from 'react-image-and-background-image-fade'

preconnectImage('https://cdn.example.com/photo.jpg')
preloadImage({ src: '/hero.jpg', srcSet: '/hero-1200.jpg 1200w', sizes: '100vw' })
preloadImages(['/next-1.jpg', '/next-2.jpg'])
```

## Styling

The default CSS is intentionally small and class-based. You can import it, override it, or skip it and write your own.

Primary classes:

- `.ribif-root`
- `.ribif-image`
- `.ribif-background`
- `.ribif-placeholder`
- `.ribif-placeholder-skeleton`
- `.ribif-placeholder-blur`
- `.ribif-placeholder-color`

Transitions use CSS variables:

```css
.gallery-image {
  --ribif-duration: 450ms;
  --ribif-easing: cubic-bezier(0.2, 0, 0, 1);
}
```

The default CSS respects `prefers-reduced-motion`.

## Migration From V1

See [docs/migration-v1-to-v2.md](docs/migration-v1-to-v2.md).

## Development

```bash
npm install
npm run check
npm test
npm run typecheck
npm run build
```

## License

MIT © [nckblu](https://github.com/nckblu)
