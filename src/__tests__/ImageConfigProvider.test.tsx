import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Image } from '../components/Image'
import { ImageConfigProvider } from '../config'

it('applies shared image defaults from the provider', () => {
  render(
    <ImageConfigProvider
      value={{
        color: '#123456',
        duration: 650,
        placeholder: 'color'
      }}
    >
      <Image src="/cat.jpg" alt="Cat" width={320} height={240} />
    </ImageConfigProvider>
  )

  const image = screen.getByRole('img', { name: 'Cat' })
  const root = image.closest('.ribif-root')
  const placeholder = root?.querySelector('.ribif-placeholder')

  expect(root).toHaveStyle({ '--ribif-duration': '650ms' })
  expect(placeholder).toHaveStyle({ backgroundColor: '#123456' })

  fireEvent.load(image)

  expect(root).toHaveAttribute('data-status', 'loaded')
})
