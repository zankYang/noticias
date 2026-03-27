<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import type { VarianteHero } from '~/composables/useSitioPortada'

withDefaults(
  defineProps<{
    main: ArticulosCollectionItem | null
    side: ArticulosCollectionItem[]
    titulo?: string
    subtitulo?: string
    variante?: VarianteHero
  }>(),
  { variante: 'rejilla' }
)
</script>

<template>
  <section
    v-if="main"
    class="hero news-container"
    :class="`hero--${variante ?? 'rejilla'}`"
  >
    <header v-if="titulo || subtitulo" class="hero__head">
      <h2 v-if="titulo" class="hero__title news-title-serif">{{ titulo }}</h2>
      <p v-if="subtitulo" class="hero__sub">{{ subtitulo }}</p>
    </header>

    <template v-if="variante === 'editorial'">
      <div class="hero__editorial-main">
        <NewsArticleCard :article="main" variant="large" />
      </div>
      <div v-if="side.length" class="hero__editorial-row">
        <NewsArticleCard
          v-for="item in side"
          :key="item.id"
          :article="item"
          variant="medium"
        />
      </div>
    </template>

    <div v-else class="hero__grid">
      <NewsArticleCard :article="main" variant="large" class="hero__main" />
      <div v-if="side.length && variante !== 'soloPrincipal'" class="hero__side">
        <NewsArticleCard
          v-for="item in side"
          :key="item.id"
          :article="item"
          :variant="variante === 'mosaico' ? 'medium' : 'compact'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 1.25rem;
}

.hero__head {
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  margin: 0 0 0.35rem;
}

.hero__sub {
  margin: 0;
  color: var(--news-muted);
  font-size: 0.95rem;
  line-height: 1.45;
  max-width: 40rem;
}

.hero__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .hero--rejilla .hero__grid {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }

  .hero--invertida .hero__grid {
    grid-template-columns: 1fr 1.4fr;
    align-items: start;
  }

  .hero--invertida .hero__main {
    order: 2;
  }

  .hero--invertida .hero__side {
    order: 1;
  }

  .hero--mosaico .hero__grid {
    grid-template-columns: 1.35fr 1fr;
    grid-template-rows: auto auto;
    align-items: stretch;
  }

  .hero--mosaico .hero__main {
    grid-row: 1 / -1;
  }

  .hero--mosaico .hero__side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    align-content: start;
  }
}

.hero__side {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hero--apilado .hero__side {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
}

@media (min-width: 640px) {
  .hero--apilado .hero__side {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .hero--apilado .hero__side {
    grid-template-columns: repeat(3, 1fr);
  }
}

.hero--soloPrincipal .hero__grid {
  grid-template-columns: 1fr;
}

.hero--cinta .hero__grid {
  grid-template-columns: 1fr;
}

.hero--cinta .hero__side {
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.85rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  margin-inline: -0.25rem;
  padding-inline: 0.25rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.hero--cinta .hero__side :deep(.nac) {
  flex: 0 0 min(272px, 78vw);
  scroll-snap-align: start;
  margin-bottom: 0;
}

.hero__editorial-main {
  margin-bottom: 1rem;
}

.hero__editorial-row {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .hero__editorial-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .hero__editorial-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
