import { CATEGORIAS } from '../../categorias'

export interface SitioPortadaConfig {
  nombreSitio: string
  taglineBar: string
  mostrarEnlaceStudio: boolean
  piePagina?: string
  seoTitulo: string
  seoDescripcion: string
  categoriasNav: (typeof CATEGORIAS)[number][]
  portada: {
    mostrarHero: boolean
    tituloUltimasNoticias: string
    limiteUltimas: number
    mostrarSeccionesCategoria: boolean
    articulosPorSeccion: number
    mostrarSidebar: boolean
    tituloSidebar: string
    limiteSidebar: number
  }
}

export function sitioPortadaPorDefecto(): SitioPortadaConfig {
  return {
    nombreSitio: 'Noticias México',
    taglineBar: 'Últimas noticias',
    mostrarEnlaceStudio: true,
    piePagina: 'Contenido editable con Nuxt Content y Studio',
    seoTitulo: 'Noticias México — Portada',
    seoDescripcion: 'Últimas noticias de México y el mundo.',
    categoriasNav: [...CATEGORIAS],
    portada: {
      mostrarHero: true,
      tituloUltimasNoticias: 'Últimas noticias',
      limiteUltimas: 8,
      mostrarSeccionesCategoria: true,
      articulosPorSeccion: 4,
      mostrarSidebar: true,
      tituloSidebar: 'Lo más leído',
      limiteSidebar: 5
    }
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
  return {
    ...d,
    ...r,
    categoriasNav,
    portada: {
      ...d.portada,
      ...(pr && typeof pr === 'object' ? pr : {})
    }
  } as SitioPortadaConfig
}

/** Usar con `await` en layouts/páginas para que el SSR espere los datos de `content/sitio/portada.yml`. */
export async function useSitioPortadaResuelto() {
  const { data, ...rest } = await useAsyncData('sitio-portada', () =>
    queryCollection('sitio').where('stem', '=', 'sitio/portada').first()
  )
  const sitio = computed(() => mergeSitioPortada(data.value))
  return { data, sitio, ...rest }
}
