import { CATEGORIAS } from '../../categorias'

export const VARIANTES_HERO = [
  'rejilla',
  'apilado',
  'soloPrincipal',
  'invertida',
  'mosaico',
  'cinta',
  'editorial'
] as const

export type VarianteHero = (typeof VARIANTES_HERO)[number]

export interface HeroPortadaConfig {
  titulo?: string
  subtitulo?: string
  limiteSecundarias: number
  variante: VarianteHero
  principalPath?: string
  secundariosPaths?: string[]
}

export type SidebarPosicion = 'derecha' | 'izquierda'
export type SidebarAncho = 'estrecho' | 'normal' | 'amplio'
export type SidebarVariante = 'numerada' | 'tarjetas' | 'minimal'

export interface SidebarPortadaConfig {
  posicion: SidebarPosicion
  ancho: SidebarAncho
  variante: SidebarVariante
}

export type AnchoContenidoSitio = 'estrecho' | 'normal' | 'amplio' | 'maximo'

export interface DisenoSitioConfig {
  anchoContenido: AnchoContenidoSitio
}

export interface SitioPortadaConfig {
  nombreSitio: string
  taglineBar: string
  mostrarEnlaceStudio: boolean
  piePagina?: string
  seoTitulo: string
  seoDescripcion: string
  categoriasNav: (typeof CATEGORIAS)[number][]
  diseno: DisenoSitioConfig
  portada: {
    mostrarHero: boolean
    tituloUltimasNoticias: string
    limiteUltimas: number
    mostrarSeccionesCategoria: boolean
    articulosPorSeccion: number
    mostrarSidebar: boolean
    tituloSidebar: string
    limiteSidebar: number
    sidebar: SidebarPortadaConfig
    hero: HeroPortadaConfig
  }
}

const heroPorDefecto = (): HeroPortadaConfig => ({
  limiteSecundarias: 3,
  variante: 'rejilla'
})

const sidebarPorDefecto = (): SidebarPortadaConfig => ({
  posicion: 'derecha',
  ancho: 'normal',
  variante: 'numerada'
})

const disenoPorDefecto = (): DisenoSitioConfig => ({
  anchoContenido: 'normal'
})

export function sitioPortadaPorDefecto(): SitioPortadaConfig {
  return {
    nombreSitio: 'Noticias México',
    taglineBar: 'Últimas noticias',
    mostrarEnlaceStudio: true,
    piePagina: 'Contenido editable con Nuxt Content y Studio',
    seoTitulo: 'Noticias México — Portada',
    seoDescripcion: 'Últimas noticias de México y el mundo.',
    categoriasNav: [...CATEGORIAS],
    diseno: disenoPorDefecto(),
    portada: {
      mostrarHero: true,
      tituloUltimasNoticias: 'Últimas noticias',
      limiteUltimas: 8,
      mostrarSeccionesCategoria: true,
      articulosPorSeccion: 4,
      mostrarSidebar: true,
      tituloSidebar: 'Lo más leído',
      limiteSidebar: 5,
      sidebar: sidebarPorDefecto(),
      hero: heroPorDefecto()
    }
  }
}

function mergeSidebar(
  base: SidebarPortadaConfig,
  raw: Record<string, unknown> | undefined
): SidebarPortadaConfig {
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<SidebarPortadaConfig>
  const pos: SidebarPosicion =
    r.posicion === 'izquierda' || r.posicion === 'derecha' ? r.posicion : base.posicion
  const ancho: SidebarAncho =
    r.ancho === 'estrecho' || r.ancho === 'normal' || r.ancho === 'amplio' ? r.ancho : base.ancho
  const variante: SidebarVariante =
    r.variante === 'numerada' || r.variante === 'tarjetas' || r.variante === 'minimal'
      ? r.variante
      : base.variante
  return { posicion: pos, ancho, variante }
}

function mergeDiseno(
  base: DisenoSitioConfig,
  raw: Record<string, unknown> | undefined
): DisenoSitioConfig {
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Partial<DisenoSitioConfig>
  const anchoContenido: AnchoContenidoSitio =
    r.anchoContenido === 'estrecho' ||
    r.anchoContenido === 'normal' ||
    r.anchoContenido === 'amplio' ||
    r.anchoContenido === 'maximo'
      ? r.anchoContenido
      : base.anchoContenido
  return { anchoContenido }
}

function mergePortada(
  base: SitioPortadaConfig['portada'],
  raw: Record<string, unknown> | undefined
): SitioPortadaConfig['portada'] {
  if (!raw || typeof raw !== 'object') return base
  const heroRaw = raw.hero
  const sidebarRaw = raw.sidebar
  const { hero: _h, sidebar: _s, ...rest } = raw as Record<string, unknown> & {
    hero?: unknown
    sidebar?: unknown
  }
  const heroMerged: HeroPortadaConfig = {
    ...base.hero,
    ...(heroRaw && typeof heroRaw === 'object' ? (heroRaw as Partial<HeroPortadaConfig>) : {})
  }
  const lim = Number(heroMerged.limiteSecundarias)
  heroMerged.limiteSecundarias =
    Number.isFinite(lim) && lim >= 0 ? Math.min(8, Math.floor(lim)) : base.hero.limiteSecundarias
  const v = heroMerged.variante
  heroMerged.variante = VARIANTES_HERO.includes(v as VarianteHero)
    ? (v as VarianteHero)
    : base.hero.variante
  return {
    ...base,
    ...(rest as Partial<SitioPortadaConfig['portada']>),
    sidebar: mergeSidebar(base.sidebar, sidebarRaw as Record<string, unknown> | undefined),
    hero: heroMerged
  }
}

export function mergeSitioPortada(raw: unknown): SitioPortadaConfig {
  const d = sitioPortadaPorDefecto()
  if (!raw || typeof raw !== 'object') return d
  const r = raw as Record<string, unknown>
  const pr = r.portada as Record<string, unknown> | undefined
  const nav = r.categoriasNav
  const categoriasNav =
    Array.isArray(nav) && nav.length > 0 ? (nav as SitioPortadaConfig['categoriasNav']) : d.categoriasNav
  const diseno = mergeDiseno(d.diseno, r.diseno as Record<string, unknown> | undefined)
  return {
    ...d,
    ...r,
    categoriasNav,
    diseno,
    portada: mergePortada(d.portada, pr)
  } as SitioPortadaConfig
}

/** Clase para el layout según `diseno.anchoContenido` (vacío = normal, ya en `:root`). */
export function claseLayoutAnchoSitio(diseno: DisenoSitioConfig): string {
  switch (diseno.anchoContenido) {
    case 'estrecho':
      return 'layout--sitio-estrecho'
    case 'amplio':
      return 'layout--sitio-amplio'
    case 'maximo':
      return 'layout--sitio-maximo'
    default:
      return ''
  }
}

/** Usar con `await` en layouts/páginas para que el SSR espere los datos de `content/sitio/portada.yml`. */
export async function useSitioPortadaResuelto() {
  const { data, ...rest } = await useAsyncData(
    'sitio-portada',
    () => queryCollection('sitio').where('stem', '=', 'sitio/portada').first(),
    import.meta.dev
      ? {
          // En dev, no reutilizar caché de payloads antiguos al editar el YAML.
          getCachedData: () => undefined
        }
      : {}
  )
  const sitio = computed(() => mergeSitioPortada(data.value))
  return { data, sitio, ...rest }
}
