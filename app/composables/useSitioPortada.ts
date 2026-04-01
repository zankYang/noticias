import { esCategoriaValida } from '~/utils/seccionesPortada'

export const VARIANTES_HERO = [
  'rejilla',
  'apilado',
  'soloPrincipal',
  'invertida',
  'mosaico',
  'cinta',
  'editorial',
  'ajustado',
  'laterales',
  /** Una columna ancha + dos notas apiladas; fotos a pegar con degradado y titular encima (tipo portal). */
  'triada'
] as const

export type VarianteHero = (typeof VARIANTES_HERO)[number]

export interface HeroPortadaConfig {
  titulo?: string
  subtitulo?: string
  limiteSecundarias: number
  variante: VarianteHero
  principalIdentificador?: string
  secundariosIdentificadores?: string[]
  /** Variante `ajustado`: proporción `fr` columna principal (p. ej. 1.65). */
  ajustadoColumnaPrincipal?: number
  /** Variante `ajustado`: proporción `fr` columna secundarias (p. ej. 1). */
  ajustadoColumnaSecundarias?: number
  /** Variante `ajustado`: hueco entre columnas en `rem`. */
  ajustadoSeparacionRem?: number
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

export const VARIANTES_GRID_SECCIONES = ['clasica', 'densa', 'lista', 'destacado'] as const
export type VarianteGridSecciones = (typeof VARIANTES_GRID_SECCIONES)[number]
export type EspaciadoSecciones = 'normal' | 'amplio' | 'compacto'

export interface SeccionItemOverride {
  categoria: string
  titulo?: string
  limite?: number
  oculta?: boolean
  varianteGrid?: VarianteGridSecciones
  columnasEscritorio?: 2 | 3 | 4
}

export interface SeccionesPortadaConfig {
  varianteGrid: VarianteGridSecciones
  columnasEscritorio?: 2 | 3 | 4
  tituloPrefijo: string
  tituloSufijo: string
  /** null = mismo orden que las categorías detectadas en artículos */
  ordenCategorias: string[] | null
  varianteTarjeta: 'medium' | 'compact'
  mostrarTitulo: boolean
  mostrarBordeTitulo: boolean
  espaciado: EspaciadoSecciones
  items: SeccionItemOverride[]
}

export interface PortadaBannerConfig {
  imagen?: string
  alt?: string
  /** Ruta interna (/...) o URL absoluta; si falta, la imagen no es clicable. */
  enlace?: string
}

export interface SitioPortadaConfig {
  nombreSitio: string
  taglineBar: string
  piePagina?: string
  seoTitulo: string
  seoDescripcion: string
  diseno: DisenoSitioConfig
  portada: {
    banner?: PortadaBannerConfig
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
    secciones: SeccionesPortadaConfig
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

const seccionesPorDefecto = (): SeccionesPortadaConfig => ({
  varianteGrid: 'clasica',
  tituloPrefijo: '',
  tituloSufijo: '',
  ordenCategorias: null,
  varianteTarjeta: 'medium',
  mostrarTitulo: true,
  mostrarBordeTitulo: true,
  espaciado: 'normal',
  items: []
})

function parseVarianteGridSeccion(v: unknown): VarianteGridSecciones | undefined {
  return VARIANTES_GRID_SECCIONES.includes(v as VarianteGridSecciones)
    ? (v as VarianteGridSecciones)
    : undefined
}

function parseColumnasSeccion(v: unknown): 2 | 3 | 4 | undefined {
  return v === 2 || v === 3 || v === 4 ? v : undefined
}

function normalizeSeccionItems(
  raw: unknown,
  previous: SeccionItemOverride[]
): SeccionItemOverride[] {
  if (!Array.isArray(raw)) return previous
  const map = new Map<string, SeccionItemOverride>()
  for (const p of previous) map.set(p.categoria, { ...p })
  for (const row of raw) {
    if (!row || typeof row !== 'object') continue
    const o = row as Record<string, unknown>
    if (!esCategoriaValida(o.categoria)) continue
    const categoria = o.categoria as string
    const prev = map.get(categoria) ?? { categoria }
    const limRaw = o.limite
    const lim =
      typeof limRaw === 'number' && Number.isFinite(limRaw)
        ? Math.max(0, Math.min(24, Math.floor(limRaw)))
        : prev.limite
    map.set(categoria, {
      categoria,
      titulo: typeof o.titulo === 'string' ? o.titulo : prev.titulo,
      limite: lim,
      oculta: typeof o.oculta === 'boolean' ? o.oculta : prev.oculta,
      varianteGrid: parseVarianteGridSeccion(o.varianteGrid) ?? prev.varianteGrid,
      columnasEscritorio: parseColumnasSeccion(o.columnasEscritorio) ?? prev.columnasEscritorio
    })
  }
  return [...map.values()]
}

function mergeSecciones(
  base: SeccionesPortadaConfig,
  raw: Record<string, unknown> | undefined
): SeccionesPortadaConfig {
  if (!raw || typeof raw !== 'object') return base
  const r = raw as Record<string, unknown>
  let ordenCategorias = base.ordenCategorias
  if (Array.isArray(r.ordenCategorias)) {
    const filtro = r.ordenCategorias.filter(esCategoriaValida) as string[]
    ordenCategorias = filtro.length ? filtro : null
  }
  const esp = r.espaciado
  const espaciado: EspaciadoSecciones =
    esp === 'amplio' || esp === 'compacto' || esp === 'normal' ? esp : base.espaciado
  return {
    ...base,
    varianteGrid: parseVarianteGridSeccion(r.varianteGrid) ?? base.varianteGrid,
    columnasEscritorio: parseColumnasSeccion(r.columnasEscritorio) ?? base.columnasEscritorio,
    tituloPrefijo: typeof r.tituloPrefijo === 'string' ? r.tituloPrefijo : base.tituloPrefijo,
    tituloSufijo: typeof r.tituloSufijo === 'string' ? r.tituloSufijo : base.tituloSufijo,
    ordenCategorias,
    varianteTarjeta:
      r.varianteTarjeta === 'compact' || r.varianteTarjeta === 'medium'
        ? r.varianteTarjeta
        : base.varianteTarjeta,
    mostrarTitulo: typeof r.mostrarTitulo === 'boolean' ? r.mostrarTitulo : base.mostrarTitulo,
    mostrarBordeTitulo:
      typeof r.mostrarBordeTitulo === 'boolean' ? r.mostrarBordeTitulo : base.mostrarBordeTitulo,
    espaciado,
    items: r.items !== undefined ? normalizeSeccionItems(r.items, base.items) : base.items
  }
}

export function sitioPortadaPorDefecto(): SitioPortadaConfig {
  return {
    nombreSitio: 'Noticias México',
    taglineBar: 'Últimas noticias',
    piePagina: 'Contenido editable con Nuxt Content y Studio',
    seoTitulo: 'Noticias México — Portada',
    seoDescripcion: 'Últimas noticias de México y el mundo.',
    diseno: disenoPorDefecto(),
    portada: {
      banner: undefined,
      mostrarHero: true,
      tituloUltimasNoticias: 'Últimas noticias',
      limiteUltimas: 8,
      mostrarSeccionesCategoria: true,
      articulosPorSeccion: 4,
      mostrarSidebar: true,
      tituloSidebar: 'Lo más leído',
      limiteSidebar: 5,
      sidebar: sidebarPorDefecto(),
      hero: heroPorDefecto(),
      secciones: seccionesPorDefecto()
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

function mergeBanner(
  base: PortadaBannerConfig | undefined,
  raw: unknown
): PortadaBannerConfig | undefined {
  if (!raw || typeof raw !== 'object') {
    return base?.imagen?.trim() ? { ...base } : undefined
  }
  const r = raw as Record<string, unknown>
  const out: PortadaBannerConfig = {
    imagen:
      typeof r.imagen === 'string'
        ? r.imagen
        : typeof base?.imagen === 'string'
          ? base.imagen
          : undefined,
    alt: typeof r.alt === 'string' ? r.alt : base?.alt,
    enlace: typeof r.enlace === 'string' ? r.enlace : base?.enlace
  }
  if (!out.imagen?.trim()) return undefined
  return out
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
  const seccionesRaw = raw.secciones
  const bannerRaw = raw.banner
  const { hero: _h, sidebar: _s, secciones: _sec, banner: _ban, ...rest } = raw as Record<
    string,
    unknown
  > & {
    hero?: unknown
    sidebar?: unknown
    secciones?: unknown
    banner?: unknown
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
    banner: mergeBanner(base.banner, bannerRaw),
    secciones: mergeSecciones(
      base.secciones,
      seccionesRaw as Record<string, unknown> | undefined
    ),
    sidebar: mergeSidebar(base.sidebar, sidebarRaw as Record<string, unknown> | undefined),
    hero: heroMerged
  }
}

export function mergeSitioPortada(raw: unknown): SitioPortadaConfig {
  const d = sitioPortadaPorDefecto()
  if (!raw || typeof raw !== 'object') return d
  const r = raw as Record<string, unknown>
  const pr = r.portada as Record<string, unknown> | undefined
  const diseno = mergeDiseno(d.diseno, r.diseno as Record<string, unknown> | undefined)
  return {
    ...d,
    ...r,
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
