import { renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { useImage } from '../hooks/useImage'
import { clearImageCache } from '../utils/preload'
import { flushImageLoad, mockImage } from './test-utils'

afterEach(() => {
  clearImageCache()
})

it('loads an image and exposes loaded state', async () => {
  mockImage('load')

  const { result } = renderHook(() => useImage({ src: '/cat.jpg' }))

  expect(result.current.status).toBe('loading')

  await flushImageLoad()

  expect(result.current.status).toBe('loaded')
  expect(result.current.isLoaded).toBe(true)
})

it('reports errors when an image fails', async () => {
  mockImage('error')

  const { result } = renderHook(() => useImage({ src: '/missing.jpg' }))

  await flushImageLoad()

  expect(result.current.status).toBe('error')
  expect(result.current.error?.message).toContain('/missing.jpg')
})

it('stays idle until enabled', async () => {
  mockImage('load')

  const { result, rerender } = renderHook(
    ({ enabled }) => useImage({ src: '/cat.jpg', enabled }),
    { initialProps: { enabled: false } }
  )

  expect(result.current.status).toBe('idle')

  rerender({ enabled: true })
  await flushImageLoad()

  expect(result.current.status).toBe('loaded')
})
