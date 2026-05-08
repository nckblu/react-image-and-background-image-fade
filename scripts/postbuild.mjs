import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const directive = '"use client";\n'
const bundles = ['dist/index.js', 'dist/index.cjs']

await Promise.all(
  bundles.map(async file => {
    const path = join(root, file)
    const code = await readFile(path, 'utf8')
    if (code.startsWith(directive)) return
    await writeFile(path, `${directive}${code}`)
  })
)

await copyFile(join(root, 'src/styles/styles.css'), join(root, 'dist/styles.css'))
