<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'

defineProps<{
  id: string
  titulo: string
  articulos: ArticulosCollectionItem[]
}>()
</script>

<template>
  <section v-if="articulos.length" :id="id" class="sec news-container">
    <h2 class="sec__title news-title-serif">{{ titulo }}</h2>
    <div class="sec__grid">
      <NewsArticleCard
        v-for="a in articulos"
        :key="a.id"
        :article="a"
        variant="medium"
      />
    </div>
  </section>
</template>

<style scoped>
.sec {
  padding-block: 1.5rem;
  scroll-margin-top: 6rem;
}

.sec__title {
  font-size: 1.35rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--news-red);
}

.sec__grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .sec__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .sec__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
