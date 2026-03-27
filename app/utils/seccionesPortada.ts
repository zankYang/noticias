import { CARPETA_POR_CATEGORIA, CATEGORIAS } from '../../categorias'

/**
 * Orden final de categorías en portada: respeta `ordenCategorias` si viene en YAML
 * (solo categorías presentes en `nav`), y añade el resto de `nav` al final.
 */
export function ordenCategoriasParaSecciones(
  nav: readonly string[],
  ordenPreferido: readonly string[] | null
): string[] {
  if (!ordenPreferido?.length) return [...nav]
  const setNav = new Set(nav)
  const seen = new Set<string>()
  const out: string[] = []
  for (const c of ordenPreferido) {
    if (setNav.has(c) && !seen.has(c)) {
      seen.add(c)
      out.push(c)
    }
  }
  for (const c of nav) {
    if (!seen.has(c)) out.push(c)
  }
  return out
}

export function esCategoriaValida(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function tituloDesdeSlug(slug: string) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function carpetaDesdePathArticulo(path: string): string | null {
  const m = path.match(/^\/articulos\/([^/]+)\//)
  return m?.[1] ?? null
}

export function etiquetaCategoriaDesdeCarpeta(carpeta: string): string {
  const known = Object.entries(CARPETA_POR_CATEGORIA).find(([, slug]) => slug === carpeta)
  return known?.[0] ?? tituloDesdeSlug(carpeta)
}

export function categoriasDesdeArticulos(
  articulos: Array<{ path: string }>
): Array<{ key: string; label: string }> {
  const map = new Map<string, string>()
  for (const a of articulos) {
    const carpeta = carpetaDesdePathArticulo(a.path)
    if (!carpeta) continue
    if (!map.has(carpeta)) map.set(carpeta, etiquetaCategoriaDesdeCarpeta(carpeta))
  }
  const knownOrder = CATEGORIAS.map((c) => CARPETA_POR_CATEGORIA[c])
  return [...map.entries()]
    .sort((a, b) => {
      const ia = knownOrder.indexOf(a[0])
      const ib = knownOrder.indexOf(b[0])
      const va = ia === -1 ? 999 : ia
      const vb = ib === -1 ? 999 : ib
      if (va !== vb) return va - vb
      return a[1].localeCompare(b[1], 'es')
    })
    .map(([key, label]) => ({ key, label }))
}
