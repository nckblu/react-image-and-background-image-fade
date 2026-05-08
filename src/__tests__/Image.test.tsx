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
