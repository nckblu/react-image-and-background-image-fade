# Changelog

## 2.0.0-alpha.0

- Rebuilt the package in TypeScript.
- Added `Image`, `BackgroundImage`, `Picture`, `ImageLoader`, `useImage`, and `useInView`.
- Added optional default CSS with skeleton, color, and blur placeholders.
- Added `ImageConfigProvider` for app-wide image defaults.
- Added responsive helpers: `createSrcSet`, `createSizes`, `appendImageParams`, and `defaultImageWidths`.
- Added preload helpers for individual and batched image preloading.
- Replaced the old Rollup/CRA/Enzyme toolchain with tsup, Vitest, Testing Library, and Playwright.
- Added SSR tests, browser smoke verification, and package validation.
- Removed runtime dependencies on `styled-components`, `prop-types`, `image-preloader`, and `react-visibility-sensor`.
