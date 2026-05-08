import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Picture } from '../components/Picture'

it('renders sources and fallback image', () => {
  render(
    <Picture
      src="/fallback.jpg"
      alt="Landscape"
      width={1200}
      height={800}
      sources={[
        { srcSet: '/landscape.avif 1200w', type: 'image/avif' },
        { srcSet: '/landscape.webp 1200w', type: 'image/webp' }
      ]}
    />
  )

  expect(document.querySelectorAll('source')).toHaveLength(2)
  expect(screen.getByRole('img', { name: 'Landscape' })).toHaveAttribute('src', '/fallback.jpg')
})

it('updates load state when the fallback image loads', () => {
  render(<Picture src="/fallback.jpg" alt="Landscape" sources={[]} />)

  const image = screen.getByRole('img', { name: 'Landscape' })
  const root = image.closest('.ribif-root')

  fireEvent.load(image)

  expect(root).toHaveAttribute('data-status', 'loaded')
})
