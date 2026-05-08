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
