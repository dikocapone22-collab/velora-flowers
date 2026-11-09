/**
 * Оптимизация изображений: исходники (JPG/PNG/WebP) → WebP нужных размеров, кадр 4:5.
 *
 * Как использовать:
 *   1. Положите реальные фото в src/assets/source/ с именами:
 *      hero, about, red-romance, pink-dream, white-elegance, summer-mood, royal-roses, tenderness
 *      (расширение .jpg / .jpeg / .png / .webp)
 *   2. Запустите: npm run images
 *   Результат появится в src/assets/images/.
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, parse, resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname ?? '.', '..')
const sourceDir = process.env.IMAGES_SRC ? resolve(process.env.IMAGES_SRC) : join(root, 'src/assets/source')
const outDir = join(root, 'src/assets/images')

const large = ['hero', 'about']
const sizesFor = (name) => (large.includes(name) ? [800, 1200] : [480, 800])

if (!existsSync(sourceDir)) {
  console.error(`Папка с исходниками не найдена: ${sourceDir}`)
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const files = readdirSync(sourceDir).filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
if (files.length === 0) console.warn('В папке нет изображений для обработки.')

for (const file of files) {
  const { name } = parse(file)
  for (const width of sizesFor(name)) {
    const height = Math.round((width * 5) / 4)
    const target = join(outDir, `${name}-${width}.webp`)
    const info = await sharp(join(sourceDir, file))
      .rotate()
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .webp({ quality: width > 800 ? 72 : 76, effort: 6 })
      .toFile(target)
    console.log(`✓ ${name}-${width}.webp  ${(info.size / 1024).toFixed(1)} КБ`)
  }
}
