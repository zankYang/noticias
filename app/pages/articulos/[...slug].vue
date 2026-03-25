<script setup lang="ts">
import { formatearFechaLarga } from '~/utils/fechaArticulo'

definePageMeta({
  layout: 'default'
})

const route = useRoute()

const { data: doc } = await useAsyncData(
  () => `articulo-${route.path}`,
  () => queryCollection('articulos').path(route.path).first(),
  { watch: [() => route.path] }
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

useSeoMeta({
  title: doc.value.title,
  description: doc.value.description
})
</script>

<template>
  <article v-if="doc" class="article-page news-container">
    <nav class="article-page__crumb" aria-label="Ruta">
      <NuxtLink to="/">Inicio</NuxtLink>
      <span aria-hidden="true"> / </span>
      <span>{{ doc.categoria }}</span>
    </nav>
    <p class="news-kicker">
      {{ doc.categoria }}<template v-if="doc.seccion"> · {{ doc.seccion }}</template>
    </p>
    <h1 class="news-title-serif article-page__title">{{ doc.title }}</h1>
    <p class="article-page__meta">{{ doc.autor }} · {{ formatearFechaLarga(doc.fecha) }}</p>
    <figure v-if="doc.imagen" class="article-page__hero">
      <img :src="doc.imagen" :alt="doc.title" width="960" height="540" />
    </figure>
    <p v-if="doc.description" class="article-page__lead">{{ doc.description }}</p>
    <ContentRenderer :value="doc" class="news-prose article-page__body" />
  </article>
</template>

<style scoped>
.article-page {
  max-width: 720px;
  padding-block: 1.25rem 2rem;
}

.article-page__crumb {
  font-size: 0.8rem;
  color: var(--news-muted);
  margin-bottom: 1rem;
}

.article-page__title {
  font-size: clamp(1.75rem, 4vw, 2.35rem);
  margin: 0.25rem 0 0.5rem;
}

.article-page__meta {
  color: var(--news-muted);
  font-size: 0.9rem;
  margin: 0 0 1.25rem;
}

.article-page__hero {
  margin: 0 0 1.25rem;
}

.article-page__hero img {
  width: 100%;
  border-radius: 2px;
}

.article-page__lead {
  font-size: 1.1rem;
  color: var(--news-muted);
  margin: 0 0 1.5rem;
  line-height: 1.45;
}

.article-page__body {
  margin-top: 0.5rem;
}
</style>
