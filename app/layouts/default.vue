<script setup lang="ts">
import { categoriasDesdeArticulos } from '~/utils/seccionesPortada'

const { sitio } = await useSitioPortadaResuelto()
const { data: articulosNav } = await useAsyncData('header-articulos-nav', () =>
  queryCollection('articulos').all()
)
const categoriasNav = computed(() =>
  categoriasDesdeArticulos(articulosNav.value ?? []).map((c) => c.label)
)

const layoutAnchoClass = computed(() => claseLayoutAnchoSitio(sitio.value.diseno))
</script>

<template>
  <div class="layout" :class="layoutAnchoClass">
    <NewsHeader :sitio="sitio" :categorias="categoriasNav" />
    <main class="layout__main">
      <slot />
    </main>
    <footer class="layout__footer news-container">
      <p class="layout__foot-note">
        © {{ new Date().getFullYear() }} · {{ sitio.piePagina || 'Proyecto de noticias' }}
      </p>
    </footer>
  </div>
</template>

<style scoped>
.layout__main {
  min-height: 40vh;
  padding-bottom: 2rem;
}

.layout__footer {
  border-top: 2px solid var(--color-secondary);
  padding-block: 1.5rem;
  margin-top: 2rem;
  background: linear-gradient(180deg, #fff 0%, var(--news-bg) 100%);
}

.layout__foot-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--news-muted);
}
</style>
