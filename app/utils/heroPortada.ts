import type { ArticulosCollectionItem } from '@nuxt/content'
import type { HeroPortadaConfig } from '~/composables/useSitioPortada'

function normIdent(v: string | undefined | null): string {
  return typeof v === 'string' ? v.trim() : ''
}

/** Mapa identificador → artículo (la primera aparición en `ordenados` gana si hubiera duplicados). */
export function mapaPorIdentificadorPortada(
  ordenados: ArticulosCollectionItem[]
): Map<string, ArticulosCollectionItem> {
  const map = new Map<string, ArticulosCollectionItem>()
  for (const a of ordenados) {
    const key = normIdent(
      (a as ArticulosCollectionItem & { identificadorPortada?: string }).identificadorPortada
    )
    if (key && !map.has(key)) map.set(key, a)
  }
  return map
}

export function resolverHeroPortada(
  ordenados: ArticulosCollectionItem[],
  hero: HeroPortadaConfig,
  compareFecha: (a: ArticulosCollectionItem, b: ArticulosCollectionItem) => number
): { main: ArticulosCollectionItem | null; side: ArticulosCollectionItem[] } {
  const s = ordenados
  const byIdent = mapaPorIdentificadorPortada(s)

  let main: ArticulosCollectionItem | null = null
  const principalKey = normIdent(hero.principalIdentificador)
  if (principalKey) {
    main = byIdent.get(principalKey) ?? null
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

  const secIds = hero.secundariosIdentificadores
  if (secIds?.length) {
    for (const raw of secIds) {
      if (side.length >= lim) break
      const k = normIdent(raw)
      if (!k) continue
      const a = byIdent.get(k)
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
