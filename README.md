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
      fadeType="blur-in"
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
- **8 fade types**: fade, blur-in, zoom-blur, soft-reveal, wipe, slide-up, scale, and curtain.
- **8 curated easing presets**: Material, Apple, Cinematic, Dramatic, and more.
- Responsive helpers for generating `srcSet` and `sizes`.
- Native image attributes: `srcSet`, `sizes`, `loading`, `decoding`, `fetchPriority`, `crossOrigin`, and more.
- Industry-leading skeleton shimmer with typed theme options and CSS variable customization.
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
| `skeleton` | `SkeletonOptions` | Fine-tunes the default shimmer without custom rendering. |
| `fadeType` | `"fade" \| "blur-in" \| "zoom-blur" \| "soft-reveal" \| "wipe" \| "slide-up" \| "scale" \| "curtain"` | The reveal animation style. |
| `fit`, `position` | CSS values | Maps to `object-fit` and `object-position`. |
| `renderPlaceholder` | function | Fully custom placeholder. |
| `renderError` | function | Fully custom error state. |

## Fade Types

Control how your images reveal themselves:

```tsx
<Image src="/photo.jpg" alt="Photo" fadeType="blur-in" duration={1200} />
```

| Type | Effect |
| --- | --- |
| `fade` | Standard opacity transition (default). |
| `blur-in` | Image resolves from blur to sharp. When `placeholder="blur"` has no `blurDataURL`, the final image is used as the blurred preview. |
| `zoom-blur` | A punchier blur reveal with a subtle zoom and saturation lift. |
| `soft-reveal` | Rounded inset, blur, lift, and fade for editorial image surfaces. |
| `wipe` | Horizontal clip-path reveal. |
| `slide-up` | Rises into position with opacity. |
| `scale` | Grows from 96% to full size with opacity. |
| `curtain` | Clip-path reveal from bottom to top. |

## Skeleton Shimmer

The default skeleton is a layered shimmer rather than a flat grey slab: it has a soft base wash, highlight, angled sheen, and optional accent glow. Keep the default, set CSS variables, or pass a typed `skeleton` object per component or through `ImageConfigProvider`.

```tsx
<Image
  src="/campaign.jpg"
  alt="Campaign"
  width={1200}
  height={800}
  placeholder="skeleton"
  skeleton={{
    baseColor: '#111318',
    highlightColor: '#242936',
    accentColor: 'rgb(255 61 129 / 38%)',
    sheenColor: 'rgb(255 255 255 / 76%)',
    speed: 1100,
    angle: 118,
    size: '62%',
    radius: 18
  }}
/>
```

## Easing Presets

Import curated easing curves instead of memorizing cubic-bezier values:

```tsx
import { Image, easings } from 'react-image-and-background-image-fade'

<Image
  src="/photo.jpg"
  alt="Photo"
  easing={easings.cinematic}
  fadeType="blur-in"
  duration={1200}
/>
```

Available presets: `default`, `material`, `apple`, `emphasized`, `sharp`, `spring`, `cinematic`, `dramatic`.

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

Skeleton shimmer variables:

```css
.my-skeleton {
  --ribif-skeleton-bg: #111318;
  --ribif-skeleton-highlight: #242936;
  --ribif-skeleton-accent: rgb(255 61 129 / 38%);
  --ribif-skeleton-sheen: rgb(255 255 255 / 76%);
  --ribif-shimmer-color: rgb(255 255 255 / 46%);
  --ribif-shimmer-speed: 1.1s;
  --ribif-shimmer-angle: 118deg;
  --ribif-shimmer-size: 62%;
  --ribif-skeleton-radius: 18px;
  --ribif-blur-amount: 20px;
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
