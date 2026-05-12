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

it('passes shared placeholder props through to the placeholder layer', () => {
  render(
    <Picture
      src="/fallback.jpg"
      alt="Landscape"
      sources={[]}
      placeholder="color"
      color="#123456"
      placeholderClassName="custom-placeholder"
      placeholderStyle={{ borderRadius: 14 }}
    />
  )

  const image = screen.getByRole('img', { name: 'Landscape' })
  const placeholder = image.closest('.ribif-root')?.querySelector('.ribif-placeholder-color')

  expect(placeholder).toHaveClass('custom-placeholder')
  expect(placeholder).toHaveStyle({
    backgroundColor: '#123456',
    borderRadius: '14px'
  })
})

it('uses blurDataURL for the blur placeholder when provided', () => {
  render(
    <Picture
      src="/fallback.jpg"
      alt="Landscape"
      sources={[]}
      placeholder="blur"
      blurDataURL="data:image/png;base64,picture"
      color="#ff3d81"
    />
  )

  const image = screen.getByRole('img', { name: 'Landscape' })
  const placeholder = image.closest('.ribif-root')?.querySelector('.ribif-placeholder-blur')

  expect(placeholder).toHaveStyle({
    backgroundImage: 'url("data:image/png;base64,picture")'
  })
  expect(placeholder).not.toHaveStyle({
    backgroundColor: '#ff3d81'
  })
})
