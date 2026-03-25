/**
 * @nuxt/content 3.12.x referencia un módulo inexistente desde preview/collection.js
 * (issue de empaquetado). Corrige el import a un helper local después de instalar deps.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const previewDir = join(
  root,
  'node_modules/@nuxt/content/dist/runtime/internal/preview'
)
const collectionFile = join(previewDir, 'collection.js')
const helperFile = join(previewDir, 'content-date-format.mjs')

if (!existsSync(collectionFile)) {
  console.warn('[patch-nuxt-content-preview] @nuxt/content no instalado; se omite.')
  process.exit(0)
}

const helper = `export function formatDate(date) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) {
    throw new TypeError(\`Invalid date value: "\${date}"\`)
  }
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return \`\${year.toString().padStart(4, '0')}-\${month.toString().padStart(2, '0')}-\${day.toString().padStart(2, '0')}\`
}
export function formatDateTime(datetime) {
  const d = new Date(datetime)
  if (Number.isNaN(d.getTime())) {
    throw new TypeError(\`Invalid datetime value: "\${datetime}"\`)
  }
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  return \`\${formatDate(datetime)} \${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`
}
`

writeFileSync(helperFile, helper, 'utf8')

let src = readFileSync(collectionFile, 'utf8')
const broken = `from "../../../utils/content/transformers/utils"`
const fixed = `from "./content-date-format.mjs"`

if (src.includes(fixed)) {
  process.exit(0)
}

if (!src.includes(broken)) {
  console.warn('[patch-nuxt-content-preview] Import roto no encontrado; ¿versión distinta de @nuxt/content?')
  process.exit(0)
}

writeFileSync(collectionFile, src.replace(broken, fixed), 'utf8')
console.log('[patch-nuxt-content-preview] Aplicado en @nuxt/content preview/collection.js')
