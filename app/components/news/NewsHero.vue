<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'

defineProps<{
  main: ArticulosCollectionItem | null
  side: ArticulosCollectionItem[]
}>()
</script>

<template>
  <section v-if="main" class="hero news-container">
    <div class="hero__grid">
      <NewsArticleCard :article="main" variant="large" class="hero__main" />
      <div class="hero__side">
        <NewsArticleCard
          v-for="item in side"
          :key="item.id"
          :article="item"
          variant="compact"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 1.25rem;
}

.hero__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .hero__grid {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}

.hero__side {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
