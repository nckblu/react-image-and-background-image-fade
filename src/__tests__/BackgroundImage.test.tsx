import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BackgroundImage } from '../components/BackgroundImage'
import { clearImageCache } from '../utils/preload'
import { flushImageLoad, mockImage } from './test-utils'

it('loads and applies a background image', async () => {
  clearImageCache()
  mockImage('load')

  render(
    <BackgroundImage src="/hero.jpg" width={800} height={450}>
      <span>Hero</span>
    </BackgroundImage>
  )

  await flushImageLoad()

  expect(screen.getByText('Hero').parentElement).toHaveStyle({
    backgroundImage: 'url("/hero.jpg")'
  })
})

it('supports the as prop', async () => {
  clearImageCache()
  mockImage('load')

  render(
    <BackgroundImage src="/hero.jpg" as="section">
      Section content
    </BackgroundImage>
  )

  await flushImageLoad()

  expect(screen.getByText('Section content').tagName).toBe('SECTION')
})

it('supports asChild composition', async () => {
  clearImageCache()
  mockImage('load')

  render(
    <BackgroundImage src="/hero.jpg" asChild>
      <article data-testid="article">Article content</article>
    </BackgroundImage>
  )

  await flushImageLoad()

  expect(screen.getByTestId('article')).toHaveClass('ribif-background')
  expect(screen.getByTestId('article')).toHaveStyle({
    backgroundImage: 'url("/hero.jpg")'
  })
})

it('passes shared placeholder props through to the placeholder layer', () => {
  render(
    <BackgroundImage
      src="/hero.jpg"
      placeholder="color"
      color="#123456"
      placeholderClassName="custom-placeholder"
      placeholderStyle={{ borderRadius: 16 }}
    >
      <span>Hero</span>
    </BackgroundImage>
  )

  const root = screen.getByText('Hero').closest('.ribif-root')
  const placeholder = root?.querySelector('.ribif-placeholder-color')

  expect(placeholder).toHaveClass('custom-placeholder')
  expect(placeholder).toHaveStyle({
    backgroundColor: '#123456',
    borderRadius: '16px'
  })
})

it('uses the image source as a blur placeholder without painting the color fallback', () => {
  render(
    <BackgroundImage src="/hero.jpg" placeholder="blur" color="#ff3d81">
      <span>Hero</span>
    </BackgroundImage>
  )

  const root = screen.getByText('Hero').closest('.ribif-root')
  const placeholder = root?.querySelector('.ribif-placeholder-blur')

  expect(placeholder).toHaveStyle({
    backgroundImage: 'url("/hero.jpg")'
  })
  expect(placeholder).not.toHaveStyle({
    backgroundColor: '#ff3d81'
  })
})
