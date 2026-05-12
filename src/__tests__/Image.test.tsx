import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Image } from '../components/Image'

it('renders an accessible image with stable dimensions', () => {
  render(<Image src="/cat.jpg" alt="Cat" width={400} height={300} />)

  const image = screen.getByRole('img', { name: 'Cat' })

  expect(image).toHaveAttribute('src', '/cat.jpg')
  expect(image).toHaveAttribute('width', '400')
  expect(image).toHaveAttribute('height', '300')
})

it('shows a placeholder before load and fades the image in after load', () => {
  render(<Image src="/cat.jpg" alt="Cat" width={400} height={300} />)

  const image = screen.getByRole('img', { name: 'Cat' })
  const root = image.parentElement

  expect(root).toHaveAttribute('data-status', 'loading')
  expect(root?.querySelector('.ribif-placeholder')).toBeInTheDocument()

  fireEvent.load(image)

  expect(root).toHaveAttribute('data-status', 'loaded')
  expect(image).toHaveAttribute('data-loaded', 'true')
})

it('supports custom placeholder and error renderers', () => {
  render(
    <Image
      src="/missing.jpg"
      alt="Missing"
      renderPlaceholder={() => <span>Loading custom</span>}
      renderError={() => <span>Broken custom</span>}
    />
  )

  expect(screen.getByText('Loading custom')).toBeInTheDocument()

  fireEvent.error(screen.getByRole('img', { name: 'Missing' }))

  expect(screen.getByText('Broken custom')).toBeInTheDocument()
})

it('supports empty and React node placeholders', () => {
  const { rerender } = render(<Image src="/cat.jpg" alt="Cat" placeholder="empty" />)

  const image = screen.getByRole('img', { name: 'Cat' })
  expect(image.parentElement?.querySelector('.ribif-placeholder')).not.toBeInTheDocument()

  rerender(<Image src="/cat.jpg" alt="Cat" placeholder={<span>Node placeholder</span>} />)

  expect(screen.getByText('Node placeholder')).toBeInTheDocument()
})

it('applies color placeholders with custom class and style props', () => {
  render(
    <Image
      src="/cat.jpg"
      alt="Cat"
      color="#123456"
      placeholder="color"
      placeholderClassName="custom-placeholder"
      placeholderStyle={{ borderRadius: 12 }}
    />
  )

  const image = screen.getByRole('img', { name: 'Cat' })
  const placeholder = image.parentElement?.querySelector('.ribif-placeholder-color')

  expect(placeholder).toHaveClass('custom-placeholder')
  expect(placeholder).toHaveStyle({
    backgroundColor: '#123456',
    borderRadius: '12px'
  })
})

it('uses the image source as the blur placeholder fallback', () => {
  render(<Image src="/cat.jpg" alt="Cat" color="#ff3d81" placeholder="blur" />)

  const image = screen.getByRole('img', { name: 'Cat' })
  const placeholder = image.parentElement?.querySelector('.ribif-placeholder-blur')

  expect(placeholder).toHaveStyle({
    backgroundImage: 'url("/cat.jpg")'
  })
  expect(placeholder).not.toHaveStyle({
    backgroundColor: '#ff3d81'
  })
})

it('uses blurDataURL when provided for blur placeholders', () => {
  render(<Image src="/cat.jpg" alt="Cat" placeholder="blur" blurDataURL="data:image/png;base64,abc" />)

  const image = screen.getByRole('img', { name: 'Cat' })
  const placeholder = image.parentElement?.querySelector('.ribif-placeholder-blur')

  expect(placeholder).toHaveStyle({
    backgroundImage: 'url("data:image/png;base64,abc")'
  })
})

it('applies custom skeleton theme variables', () => {
  render(
    <Image
      src="/cat.jpg"
      alt="Cat"
      skeleton={{
        baseColor: '#101010',
        highlightColor: '#222222',
        accentColor: '#ff3d81',
        speed: 900,
        radius: 18
      }}
    />
  )

  const image = screen.getByRole('img', { name: 'Cat' })
  const placeholder = image.parentElement?.querySelector('.ribif-placeholder-skeleton')

  expect(placeholder).toHaveStyle({
    '--ribif-skeleton-bg': '#101010',
    '--ribif-skeleton-highlight': '#222222',
    '--ribif-skeleton-accent': '#ff3d81',
    '--ribif-shimmer-speed': '900ms',
    '--ribif-skeleton-radius': '18px'
  })
})

it('calls native load and error handlers', () => {
  const onLoad = vi.fn()
  const onError = vi.fn()

  render(<Image src="/cat.jpg" alt="Cat" onLoad={onLoad} onError={onError} />)

  const image = screen.getByRole('img', { name: 'Cat' })
  fireEvent.load(image)
  fireEvent.error(image)

  expect(onLoad).toHaveBeenCalledTimes(1)
  expect(onError).toHaveBeenCalledTimes(1)
})
