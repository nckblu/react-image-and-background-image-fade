import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { build } from 'esbuild'
import { chromium } from 'playwright'

const root = process.cwd()
const tempDir = join(tmpdir(), `ribif-browser-${Date.now()}`)
const entry = join(tempDir, 'entry.jsx')
const imageDataUrl =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60"><rect width="80" height="60" fill="#4f8cff"/></svg>'
  )

await mkdir(tempDir, { recursive: true })
await writeFile(
  entry,
  `
    import React from 'react'
    import { createRoot } from 'react-dom/client'
    import { BackgroundImage, Image, Picture } from '${join(root, 'dist/index.js')}'

    function App() {
      return React.createElement('main', null,
        React.createElement(Image, {
          src: '${imageDataUrl}',
          alt: 'Inline image',
          width: 80,
          height: 60,
          placeholder: 'color',
          color: '#ccd6e0'
        }),
        React.createElement(BackgroundImage, {
          src: '${imageDataUrl}',
          width: 80,
          height: 60,
          placeholder: 'color',
          color: '#ccd6e0'
        }, React.createElement('span', null, 'Background loaded')),
        React.createElement(Picture, {
          src: '${imageDataUrl}',
          alt: 'Picture image',
          width: 80,
          height: 60,
          sources: []
        })
      )
    }

    createRoot(document.getElementById('root')).render(React.createElement(App))
  `
)

const bundle = await build({
  bundle: true,
  entryPoints: [entry],
  format: 'iife',
  jsx: 'automatic',
  nodePaths: [join(root, 'node_modules')],
  write: false
})

const css = await readFile(join(root, 'dist/styles.css'), 'utf8')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 420, height: 320 } })
const consoleErrors = []

page.on('console', message => {
  if (message.type() === 'error') {
    consoleErrors.push(message.text())
  }
})

await page.setContent(`
  <!doctype html>
  <html>
    <head><style>${css}</style></head>
    <body>
      <div id="root"></div>
      <script>${bundle.outputFiles[0].text}</script>
    </body>
  </html>
`)

await page.waitForSelector('img[alt="Inline image"][data-loaded="true"]')
await page.waitForSelector('img[alt="Picture image"][data-loaded="true"]')
await page.waitForSelector('.ribif-background-root[data-status="loaded"]')

const visibleImages = await page.locator('img[data-loaded="true"]').count()
const loadedBackgrounds = await page.locator('.ribif-background-root[data-status="loaded"]').count()

await browser.close()
await rm(tempDir, { force: true, recursive: true })

if (consoleErrors.length > 0) {
  throw new Error(`Browser console errors:\n${consoleErrors.join('\n')}`)
}

if (visibleImages !== 2 || loadedBackgrounds !== 1) {
  throw new Error(
    `Browser verification failed. Loaded images: ${visibleImages}; loaded backgrounds: ${loadedBackgrounds}`
  )
}

console.log('Browser verification passed')
