import { expect, it } from 'vitest'
import { appendImageParams, createSizes, createSrcSet } from '../utils/responsive'

it('creates deterministic width-based srcsets', () => {
  const srcSet = createSrcSet({
    src: '/photo.jpg',
    widths: [800, 320, 320],
    quality: 80
  })

  expect(srcSet).toBe('/photo.jpg?w=320&q=80 320w, /photo.jpg?w=800&q=80 800w')
})

it('supports custom loaders', () => {
  const srcSet = createSrcSet({
    src: 'photo',
    widths: [400, 800],
    loader: ({ src, width }) => `https://cdn.example.com/${src}-${width}.webp`
  })

  expect(srcSet).toBe(
    'https://cdn.example.com/photo-400.webp 400w, https://cdn.example.com/photo-800.webp 800w'
  )
})

it('creates sizes strings from breakpoint declarations', () => {
  expect(
    createSizes({
      breakpoints: [
        { media: '(max-width: 640px)', size: '100vw' },
        { media: '(max-width: 1200px)', size: '50vw' }
      ],
      defaultSize: '640px'
    })
  ).toBe('(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 640px')
})

it('appends image params without losing absolute origins', () => {
  expect(
    appendImageParams({
      src: 'https://images.example.com/photo.jpg?crop=center',
      width: 1200,
      format: 'webp'
    })
  ).toBe('https://images.example.com/photo.jpg?crop=center&w=1200&fm=webp')
})
