<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import { formatearFechaCorta } from '~/utils/fechaArticulo'

const props = withDefaults(
  defineProps<{
    article: ArticulosCollectionItem
    variant?: 'large' | 'medium' | 'compact'
  }>(),
  { variant: 'medium' }
)
</script>

<template>
  <NuxtLink :to="article.path" class="nac" :class="[`nac--${props.variant}`]">
    <div v-if="article.imagen" class="nac__media">
      <img :src="article.imagen" :alt="article.title" loading="lazy" width="800" height="450" />
    </div>
    <div class="nac__body">
      <span class="news-kicker">
        {{ article.categoria }}<template v-if="article.seccion"> · {{ article.seccion }}</template>
      </span>
      <h3 class="news-title-serif nac__title">{{ article.title }}</h3>
      <p v-if="variant !== 'compact'" class="nac__desc">{{ article.description }}</p>
      <p class="nac__meta">{{ article.autor }} · {{ formatearFechaCorta(article.fecha) }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.nac {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-bottom: 1px solid var(--news-border);
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
}

.nac:hover .nac__title {
  color: var(--news-red);
}

.nac__media {
  overflow: hidden;
  border-radius: 2px;
  margin-bottom: 0.65rem;
}

.nac__media img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.nac--compact {
  flex-direction: row;
  gap: 0.75rem;
  align-items: flex-start;
}

.nac--compact .nac__media {
  flex: 0 0 120px;
  margin-bottom: 0;
}

.nac--compact .nac__media img {
  aspect-ratio: 4 / 3;
}

.nac--large .nac__title {
  font-size: 1.35rem;
}

.nac--medium .nac__title {
  font-size: 1.05rem;
}

.nac--compact .nac__title {
  font-size: 0.95rem;
}

.nac__desc {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: var(--news-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nac__meta {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: var(--news-muted);
}
</style>
