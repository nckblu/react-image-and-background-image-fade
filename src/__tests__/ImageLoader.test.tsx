import { act, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { ImageLoader } from '../components/ImageLoader'
import { clearImageCache } from '../utils/preload'
import { flushImageLoad, mockImage } from './test-utils'

it('exposes render-prop loading state', async () => {
  clearImageCache()
  mockImage('load')

  render(
    <ImageLoader src="/cat.jpg" duration={50}>
      {state => <span>{state.status}</span>}
    </ImageLoader>
  )

  expect(screen.getByText('loading')).toBeInTheDocument()

  await flushImageLoad()

  expect(screen.getByText('loaded')).toBeInTheDocument()
})

it('keeps shouldShowLoader true for the configured duration', async () => {
  clearImageCache()
  mockImage('load')
  vi.useFakeTimers()

  render(
    <ImageLoader src="/cat.jpg" duration={250}>
      {state => <span>{String(state.shouldShowLoader)}</span>}
    </ImageLoader>
  )

  await flushImageLoad()

  expect(screen.getByText('true')).toBeInTheDocument()

  act(() => {
    vi.advanceTimersByTime(250)
  })

  expect(screen.getByText('false')).toBeInTheDocument()
  vi.useRealTimers()
})
