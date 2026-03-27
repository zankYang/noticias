import type { ArticulosCollectionItem } from '@nuxt/content'
import type { HeroPortadaConfig } from '~/composables/useSitioPortada'

export function normArticuloPath(p: string) {
  const t = p.trim()
  if (!t) return ''
  return t.startsWith('/') ? t : `/${t}`
}

export function resolverHeroPortada(
  ordenados: ArticulosCollectionItem[],
  hero: HeroPortadaConfig,
  compareFecha: (a: ArticulosCollectionItem, b: ArticulosCollectionItem) => number
): { main: ArticulosCollectionItem | null; side: ArticulosCollectionItem[] } {
  const s = ordenados
  const byPath = new Map<string, ArticulosCollectionItem>()
  for (const a of s) {
    byPath.set(normArticuloPath(a.path), a)
  }

  let main: ArticulosCollectionItem | null = null
  if (hero.principalPath) {
    main = byPath.get(normArticuloPath(hero.principalPath)) ?? null
  }
  if (!main) {
    const marcadas = s.filter((a) => a.enPortada).sort(compareFecha)
    main = marcadas[0] ?? s[0] ?? null
  }
  if (!main) return { main: null, side: [] }

  const lim =
    hero.variante === 'soloPrincipal' ? 0 : Math.max(0, Math.min(8, hero.limiteSecundarias))

  const side: ArticulosCollectionItem[] = []
  const usedIds = new Set<string>([main.id])

  if (hero.secundariosPaths?.length) {
    for (const p of hero.secundariosPaths) {
      if (side.length >= lim) break
      const a = byPath.get(normArticuloPath(p))
      if (a && !usedIds.has(a.id)) {
        usedIds.add(a.id)
        side.push(a)
      }
    }
  }

  if (side.length < lim) {
    const marcadas = s.filter((a) => a.enPortada && a.id !== main.id).sort(compareFecha)
    const rest = s.filter((a) => a.id !== main.id)
    const merged: ArticulosCollectionItem[] = []
    const seen = new Set<string>()
    for (const a of [...marcadas, ...rest]) {
      if (!seen.has(a.id)) {
        seen.add(a.id)
        merged.push(a)
      }
    }
    for (const a of merged) {
      if (side.length >= lim) break
      if (!usedIds.has(a.id)) {
        usedIds.add(a.id)
        side.push(a)
      }
    }
  }

  return { main, side: side.slice(0, lim) }
}
