<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import { fechaParaOrden } from '~/utils/fechaArticulo'
import { resolverHeroPortada } from '~/utils/heroPortada'

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

function articulosPorCategoria(cat: string) {
  return ordenados.value
    .filter((a) => a.categoria === cat)
    .slice(0, cfg.value.articulosPorSeccion)
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
            v-for="cat in sitio.categoriasNav"
            :id="sectionId(cat)"
            :key="cat"
            :titulo="cat"
            :articulos="articulosPorCategoria(cat)"
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

@media (min-width: 960px) {
  .portada-split {
    grid-template-columns: 1fr var(--portada-sidebar-ancho);
    align-items: start;
  }

  .portada-split--sidebar-izq {
    grid-template-columns: var(--portada-sidebar-ancho) 1fr;
  }

  .portada-split--sidebar-izq .portada-split__main {
    grid-column: 2;
  }

  .portada-split--sidebar-izq .portada-split__side {
    grid-column: 1;
  }

  .portada-split--full {
    grid-template-columns: 1fr;
  }

  .portada-split--full .portada-split__main {
    grid-column: 1;
  }
}
</style>
