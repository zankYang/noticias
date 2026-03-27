/**
 * Lee carpetas de `content/articulos/*` y escribe `categorias.opciones.generated.ts`
 * con etiquetas para `z.enum` en `content.config.ts` (select en Nuxt Studio).
 *
 * Mantiene el mismo mapa que `categorias.ts` (actualizar ambos si cambias slugs).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const articulosDir = path.join(root, 'content', 'articulos')
const outFile = path.join(root, 'categorias.opciones.generated.ts')

const CATEGORIAS = [
  'Nacional',
  'Mundo',
  'Economía',
  'Deportes',
  'Espectáculos',
  'Tecnología',
  'Opinión',
  'Otros'
]

const CARPETA_POR_CATEGORIA = {
  Nacional: 'nacional',
  Mundo: 'mundo',
  Economía: 'economia',
  Deportes: 'deportes',
  Espectáculos: 'espectaculos',
  Tecnología: 'tecnologia',
  Opinión: 'opinion',
  Otros: 'otros'
}

function tituloDesdeSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function etiquetaDesdeCarpeta(carpeta) {
  const known = Object.entries(CARPETA_POR_CATEGORIA).find(([, s]) => s === carpeta)
  return known ? known[0] : tituloDesdeSlug(carpeta)
}

function listarCarpetas() {
  if (!fs.existsSync(articulosDir)) return []
  return fs
    .readdirSync(articulosDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
    .map((d) => d.name)
}

const knownOrder = CATEGORIAS.map((c) => CARPETA_POR_CATEGORIA[c])
const carpetas = listarCarpetas()

const ordenadas =
  carpetas.length > 0
    ? [...carpetas].sort((a, b) => {
        const ia = knownOrder.indexOf(a)
        const ib = knownOrder.indexOf(b)
        const va = ia === -1 ? 999 : ia
        const vb = ib === -1 ? 999 : ib
        if (va !== vb) return va - vb
        return etiquetaDesdeCarpeta(a).localeCompare(etiquetaDesdeCarpeta(b), 'es')
      })
    : []

const desdeCarpetas = [...new Set(ordenadas.map(etiquetaDesdeCarpeta))]
const extras = desdeCarpetas
  .filter((l) => !CATEGORIAS.includes(l))
  .sort((a, b) => a.localeCompare(b, 'es'))
/** Base editorial + carpetas nuevas (evita romper YAML con categorías aún sin carpeta). */
let labels = [...CATEGORIAS, ...extras]

if (desdeCarpetas.length === 0 && carpetas.length === 0) {
  labels = [...CATEGORIAS]
}

const body = labels.map((l) => `  ${JSON.stringify(l)}`).join(',\n')

const file = `/**
 * Generado por scripts/sync-opciones-categorias.mjs (no editar a mano).
 * Opciones de categoría para schema / Studio; se basa en carpetas de content/articulos/.
 */
export const OPCIONES_CATEGORIA_STUDIO = [
${body}
] as const
`

fs.writeFileSync(outFile, file, 'utf8')
console.log(
  `[sync-opciones-categorias] ${labels.length} opciones (${carpetas.length} carpetas) -> categorias.opciones.generated.ts`
)
