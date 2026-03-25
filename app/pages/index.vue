<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import { fechaParaOrden } from '~/utils/fechaArticulo'

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

const portadaBloque = computed(() => {
  const s = ordenados.value
  const marcadas = s.filter((a) => a.enPortada).sort(compareFecha)
  const main = marcadas[0] ?? s[0] ?? null
  if (!main) return { main: null as ArticulosCollectionItem | null, side: [] as ArticulosCollectionItem[] }
  const sideFromMarked = marcadas.filter((a) => a.id !== main.id)
  const rest = s.filter((a) => a.id !== main.id)
  const merged: ArticulosCollectionItem[] = []
  const seen = new Set<string>()
  for (const a of [...sideFromMarked, ...rest]) {
    if (!seen.has(a.id)) {
      seen.add(a.id)
      merged.push(a)
    }
  }
  const side = merged.filter((a) => a.id !== main.id).slice(0, 3)
  return { main, side }
})

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
</script>

<template>
  <div>
    <NewsHero
      v-if="cfg.mostrarHero"
      :main="portadaBloque.main"
      :side="portadaBloque.side"
    />

    <div
      class="portada-split news-container"
      :class="{ 'portada-split--full': !cfg.mostrarSidebar }"
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
        <NewsSidebarDestacados :articulos="destacadasSidebar" :titulo="cfg.tituloSidebar" />
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
    grid-template-columns: 1fr 300px;
    align-items: start;
  }

  .portada-split--full {
    grid-template-columns: 1fr;
  }
}
</style>
