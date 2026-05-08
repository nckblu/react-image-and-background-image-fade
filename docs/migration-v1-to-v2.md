# Migration: V1 to V2

V2 is a major rewrite. The package keeps the original mission, but the API is modernized around TypeScript, hooks, native image attributes, and class-based CSS.

## Dependency Changes

Removed runtime dependencies:

- `styled-components`
- `prop-types`
- `image-preloader`
- `react-visibility-sensor`

New peer dependencies:

- `react@^18.3.0 || ^19.0.0`
- `react-dom@^18.3.0 || ^19.0.0`

## Import Styles

V1 styled itself through `styled-components`. V2 ships optional CSS:

```tsx
import 'react-image-and-background-image-fade/styles.css'
```

## Prop Renames

| V1 | V2 |
| --- | --- |
| `transitionTime="0.3s"` | `duration={300}` or `duration="300ms"` |
| `disableLoader` | `placeholder={null}` or `placeholder="empty"` |
| `renderLoader` | `renderPlaceholder` |
| `wrapperClassName` | `containerClassName` |
| `isResponsive` | Use `width`, `height`, `aspectRatio`, `srcSet`, and `sizes` |
| `element` | `as` |
| `useChild` | `asChild` |

## Image Before

```tsx
<Image
  src="/photo.jpg"
  width="800px"
  height="400px"
  isResponsive
  transitionTime="0.3s"
  renderLoader={({ hasLoaded, hasFailed }) => (
    <Loader done={hasLoaded} failed={hasFailed} />
  )}
/>
```

## Image After

```tsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, 800px"
  duration={300}
  renderPlaceholder={({ hasLoaded, hasFailed }) => (
    <Loader done={hasLoaded} failed={hasFailed} />
  )}
/>
```

## BackgroundImage Before

```tsx
<BackgroundImage
  src="/hero.jpg"
  width="100%"
  height="400px"
  element="section"
  lazyLoad
/>
```

## BackgroundImage After

```tsx
<BackgroundImage
  src="/hero.jpg"
  width="100%"
  height="400px"
  as="section"
  lazy
/>
```

## ImageLoader Before

```tsx
<ImageLoader src="/photo.jpg">
  {({ hasLoaded, shouldShowLoader, hasFailed, src }) => (
    <CustomImage
      src={src}
      loaded={hasLoaded}
      loading={shouldShowLoader}
      failed={hasFailed}
    />
  )}
</ImageLoader>
```

## ImageLoader After

```tsx
<ImageLoader src="/photo.jpg">
  {({ status, hasLoaded, shouldShowLoader, hasFailed, src }) => (
    <CustomImage
      src={src}
      status={status}
      loaded={hasLoaded}
      loading={shouldShowLoader}
      failed={hasFailed}
    />
  )}
</ImageLoader>
```

The old render-prop booleans are still present, and V2 adds `status`, `image`, and `error`.

## Responsive Images

V1 had `isResponsive`, which calculated an aspect-ratio wrapper. V2 expects normal responsive-image primitives:

```tsx
<Image
  src="/photo-1200.jpg"
  alt="Photo"
  width={1200}
  height={800}
  srcSet="/photo-640.jpg 640w, /photo-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

For a ratio-only container, use:

```tsx
<Image src="/photo.jpg" alt="Photo" width="100%" aspectRatio="3 / 2" />
```

## Lazy Loading

V1 used `lazyLoad`.

V2 uses `lazy`:

```tsx
<Image src="/photo.jpg" alt="Photo" lazy />
```

For background images or custom viewport distance:

```tsx
<BackgroundImage src="/hero.jpg" lazy={{ rootMargin: '400px 0px' }} />
```

## Recommended Upgrade Order

1. Upgrade React to 18.3+ or 19.
2. Install v2.
3. Import the stylesheet.
4. Replace `transitionTime`, `renderLoader`, `disableLoader`, and `wrapperClassName`.
5. Add missing `alt` text to every `Image`.
6. Replace `isResponsive` with numeric dimensions, `aspectRatio`, `srcSet`, and `sizes`.
7. Move complex render-prop usages to `ImageLoader` or `useImage`.
8. If many images share the same behavior, introduce `ImageConfigProvider` near the app root.
