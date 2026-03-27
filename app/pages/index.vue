<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import type { SeccionItemOverride, VarianteGridSecciones } from '~/composables/useSitioPortada'
import { fechaParaOrden } from '~/utils/fechaArticulo'
import { resolverHeroPortada } from '~/utils/heroPortada'
import {
  categoriasDesdeArticulos,
  carpetaDesdePathArticulo,
  ordenCategoriasParaSecciones
} from '~/utils/seccionesPortada'

definePageMeta({
  layout: 'default'
})

const { sitio } = await useSitioPortadaResuelto()

useSeoMeta({
  title: computed(() => sitio.value.seoTitulo),
  description: computed(() => sitio.value.seoDescripcion)
})

const { data: articulos } = await useAsyncData('portada-articulos', () =>
  queryCollection('articulos').order('fecha', 'DESC').all()
)

function compareFecha(a: ArticulosCollectionItem, b: ArticulosCollectionItem) {
  return fechaParaOrden(b.fecha).localeCompare(fechaParaOrden(a.fecha))
}

const ordenados = computed(() => [...(articulos.value ?? [])].sort(compareFecha))

const cfg = computed(() => sitio.value.portada)

const portadaBloque = computed(() =>
  resolverHeroPortada(ordenados.value, cfg.value.hero, compareFecha)
)

const heroIds = computed(() => {
  const { main, side } = portadaBloque.value
  const ids = new Set<string>()
  if (main) ids.add(main.id)
  side.forEach((a) => ids.add(a.id))
  return ids
})

const gridCentral = computed(() =>
  ordenados.value.filter((a) => !heroIds.value.has(a.id)).slice(0, cfg.value.limiteUltimas)
)

const destacadasSidebar = computed(() =>
  ordenados.value.filter((a) => a.destacada).slice(0, cfg.value.limiteSidebar)
)

function sectionId(cat: string) {
  return (
    'cat-' +
    cat
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
  )
}

function columnasParaVariante(
  variante: VarianteGridSecciones,
  itemCols: 2 | 3 | 4 | undefined,
  globalCols: 2 | 3 | 4 | undefined
): number {
  const o = itemCols ?? globalCols
  if (o) return o
  switch (variante) {
    case 'densa':
      return 3
    case 'lista':
      return 1
    default:
      return 4
  }
}

const overridesSeccion = computed(() => {
  const m = new Map<string, SeccionItemOverride>()
  for (const it of cfg.value.secciones.items) m.set(it.categoria, it)
  return m
})

const categoriasDetectadas = computed(() => categoriasDesdeArticulos(ordenados.value))
const categoriaPorEtiqueta = computed(() => {
  const m = new Map<string, string>()
  for (const c of categoriasDetectadas.value) m.set(c.label, c.key)
  return m
})

const categoriasSecciones = computed(() => {
  if (!cfg.value.mostrarSeccionesCategoria) return []
  const base = categoriasDetectadas.value.map((c) => c.label)
  const ordenadas = ordenCategoriasParaSecciones(
    base,
    cfg.value.secciones.ordenCategorias
  )
  return ordenadas.filter((c) => overridesSeccion.value.get(c)?.oculta !== true)
})

function articulosPorCategoria(cat: string, limite: number) {
  const key = categoriaPorEtiqueta.value.get(cat)
  if (!key) return []
  return ordenados.value
    .filter((a) => carpetaDesdePathArticulo(a.path) === key)
    .slice(0, limite)
}

function tituloSeccion(cat: string) {
  const o = overridesSeccion.value.get(cat)
  const nucleo = o?.titulo ?? cat
  const { tituloPrefijo, tituloSufijo } = cfg.value.secciones
  return `${tituloPrefijo}${nucleo}${tituloSufijo}`
}

function limiteSeccion(cat: string) {
  const lim = overridesSeccion.value.get(cat)?.limite
  return lim !== undefined ? lim : cfg.value.articulosPorSeccion
}

function varianteGridSeccion(cat: string): VarianteGridSecciones {
  return overridesSeccion.value.get(cat)?.varianteGrid ?? cfg.value.secciones.varianteGrid
}

function columnasSeccion(cat: string): number {
  const v = varianteGridSeccion(cat)
  const item = overridesSeccion.value.get(cat)?.columnasEscritorio
  return columnasParaVariante(v, item, cfg.value.secciones.columnasEscritorio)
}

const sidebarAnchoVar = computed(() => {
  switch (cfg.value.sidebar.ancho) {
    case 'estrecho':
      return '260px'
    case 'amplio':
      return '360px'
    default:
      return '300px'
  }
})

const portadaSplitClass = computed(() => {
  const c = ['portada-split']
  if (!cfg.value.mostrarSidebar) c.push('portada-split--full')
  else if (cfg.value.sidebar.posicion === 'izquierda') c.push('portada-split--sidebar-izq')
  return c.join(' ')
})
</script>

<template>
  <div>
    <NewsHero
      v-if="cfg.mostrarHero"
      :main="portadaBloque.main"
      :side="portadaBloque.side"
      :titulo="cfg.hero.titulo"
      :subtitulo="cfg.hero.subtitulo"
      :variante="cfg.hero.variante"
    />

    <div
      class="news-container"
      :class="portadaSplitClass"
      :style="{ '--portada-sidebar-ancho': sidebarAnchoVar }"
    >
      <div class="portada-split__main">
        <section class="bloque">
          <h2 class="bloque__title news-title-serif">{{ cfg.tituloUltimasNoticias }}</h2>
          <div class="bloque__grid">
            <NewsArticleCard
              v-for="a in gridCentral"
              :key="a.id"
              :article="a"
              variant="medium"
            />
          </div>
        </section>

        <template v-if="cfg.mostrarSeccionesCategoria">
          <NewsSectionGrid
            v-for="cat in categoriasSecciones"
            :id="sectionId(cat)"
            :key="cat"
            :titulo="tituloSeccion(cat)"
            :articulos="articulosPorCategoria(cat, limiteSeccion(cat))"
            :variante-grid="varianteGridSeccion(cat)"
            :columnas-escritorio="columnasSeccion(cat)"
            :variante-tarjeta="cfg.secciones.varianteTarjeta"
            :mostrar-titulo="cfg.secciones.mostrarTitulo"
            :mostrar-borde-titulo="cfg.secciones.mostrarBordeTitulo"
            :espaciado="cfg.secciones.espaciado"
          />
        </template>
      </div>

      <div v-if="cfg.mostrarSidebar" class="portada-split__side">
        <NewsSidebarDestacados
          :articulos="destacadasSidebar"
          :titulo="cfg.tituloSidebar"
          :variante="cfg.sidebar.variante"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bloque {
  padding-block: 1rem;
}

.bloque__title {
  font-size: 1.35rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--news-red);
}

.bloque__grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .bloque__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.portada-split {
  display: grid;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

/* Una columna: sidebar “izquierda” debe ir arriba (el DOM va main → side). */
@media (max-width: 959px) {
  .portada-split--sidebar-izq {
    display: flex;
    flex-direction: column;
  }

  .portada-split--sidebar-izq .portada-split__side {
    order: -1;
  }
}

@media (min-width: 960px) {
  .portada-split {
    grid-template-columns: 1fr var(--portada-sidebar-ancho);
    grid-template-rows: auto;
    align-items: start;
  }

  .portada-split__main,
  .portada-split__side {
    grid-row: 1;
    align-self: start;
    min-width: 0;
  }

  .portada-split__main {
    grid-column: 1;
  }

  .portada-split__side {
    grid-column: 2;
  }

  .portada-split--sidebar-izq {
    grid-template-columns: var(--portada-sidebar-ancho) 1fr;
  }

  .portada-split--sidebar-izq .portada-split__side {
    grid-column: 1;
    grid-row: 1;
  }

  .portada-split--sidebar-izq .portada-split__main {
    grid-column: 2;
    grid-row: 1;
  }

  .portada-split--full {
    grid-template-columns: 1fr;
  }

  .portada-split--full .portada-split__main {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
