import { renderToString } from 'react-dom/server'
import { expect, it } from 'vitest'
import { Image } from '../components/Image'
import { Picture } from '../components/Picture'

it('server-renders image markup', () => {
  const html = renderToString(<Image src="/cat.jpg" alt="Cat" width={400} height={300} />)

  expect(html).toContain('<img')
  expect(html).toContain('src="/cat.jpg"')
  expect(html).toContain('alt="Cat"')
})

it('server-renders picture markup', () => {
  const html = renderToString(
    <Picture
      src="/fallback.jpg"
      alt="Landscape"
      sources={[{ srcSet: '/landscape.avif 1200w', type: 'image/avif' }]}
    />
  )

  expect(html).toContain('<picture')
  expect(html).toContain('<source')
  expect(html).toContain('image/avif')
})
