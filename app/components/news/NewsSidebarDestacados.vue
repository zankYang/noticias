<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'

withDefaults(
  defineProps<{
    articulos: ArticulosCollectionItem[]
    titulo?: string
  }>(),
  { titulo: 'Lo más leído' }
)
</script>

<template>
  <aside v-if="articulos.length" class="sb">
    <h2 class="sb__title news-title-serif">{{ titulo }}</h2>
    <ol class="sb__list">
      <li v-for="(a, i) in articulos" :key="a.id" class="sb__item">
        <span class="sb__idx">{{ i + 1 }}</span>
        <NuxtLink :to="a.path" class="sb__link">{{ a.title }}</NuxtLink>
        <span class="sb__cat">{{ a.categoria }}</span>
      </li>
    </ol>
  </aside>
</template>

<style scoped>
.sb {
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  padding: 1rem;
  border-radius: 4px;
  position: sticky;
  top: 1rem;
}

.sb__title {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #111;
}

.sb__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sb__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 0.6rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--news-border);
  align-items: baseline;
}

.sb__item:last-child {
  border-bottom: none;
}

.sb__idx {
  font-weight: 800;
  color: var(--news-red);
  font-size: 1.1rem;
  line-height: 1;
}

.sb__link {
  grid-column: 2;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.3;
}

.sb__link:hover {
  color: var(--news-red);
}

.sb__cat {
  grid-column: 2;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--news-muted);
}
</style>
