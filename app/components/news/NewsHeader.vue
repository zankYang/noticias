<script setup lang="ts">
import { computed, toValue } from 'vue'
import type { SitioPortadaConfig } from '~/composables/useSitioPortada'
import { sitioPortadaPorDefecto } from '~/composables/useSitioPortada'

const props = defineProps<{
  sitio?: SitioPortadaConfig | null
}>()

const site = computed(() => {
  const raw = toValue(props.sitio)
  if (raw && typeof raw === 'object' && 'taglineBar' in raw) return raw
  return sitioPortadaPorDefecto()
})

const fechaActual = computed(() =>
  new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())
)

function slugCat(categoria: string) {
  return categoria.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

function ancla(categoria: string) {
  return `#cat-${slugCat(categoria)}`
}
</script>

<template>
  <header class="nh">
    <div class="nh__bar">
      <div class="news-container nh__bar-inner">
        <span class="nh__date">{{ fechaActual }}</span>
        <span class="nh__tagline">{{ site.taglineBar }}</span>
      </div>
    </div>
    <div class="nh__masthead news-container">
      <NuxtLink to="/" class="nh__logo">{{ site.nombreSitio }}</NuxtLink>
      <NuxtLink
        v-if="site.mostrarEnlaceStudio"
        to="/_studio"
        class="nh__studio"
        target="_blank"
        rel="noopener"
      >
        Studio
      </NuxtLink>
    </div>
    <nav class="nh__nav" aria-label="Secciones">
      <div class="news-container nh__nav-inner">
        <NuxtLink to="/" class="nh__nav-link nh__nav-link--home"> Inicio </NuxtLink>
        <a
          v-for="c in site.categoriasNav"
          :key="c"
          :href="ancla(c)"
          class="nh__nav-link"
        >
          {{ c }}
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nh__bar {
  background: #111;
  color: #f0f0f0;
  font-size: 0.75rem;
}

.nh__bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.4rem;
  text-transform: capitalize;
}

.nh__tagline {
  opacity: 0.85;
}

.nh__masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
  gap: 1rem;
}

.nh__logo {
  font-family: var(--news-serif);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.nh__logo:hover {
  color: var(--news-red);
}

.nh__studio {
  font-size: 0.8rem;
  border: 1px solid var(--news-border);
  padding: 0.35rem 0.65rem;
  border-radius: 2px;
}

.nh__studio:hover {
  border-color: var(--news-red);
  color: var(--news-red);
}

.nh__nav {
  border-top: 3px solid var(--news-red);
  border-bottom: 1px solid var(--news-border);
  background: var(--news-bg);
}

.nh__nav-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  padding-block: 0.65rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.nh__nav-link--home {
  color: var(--news-red);
}

.nh__nav-link {
  white-space: nowrap;
}

.nh__nav-link:hover {
  color: var(--news-red-dark);
}
</style>
