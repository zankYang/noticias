<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import type { SidebarVariante } from '~/composables/useSitioPortada'

withDefaults(
  defineProps<{
    articulos: ArticulosCollectionItem[]
    titulo?: string
    variante?: SidebarVariante
  }>(),
  { titulo: 'Lo más leído', variante: 'numerada' }
)
</script>

<template>
  <aside v-if="articulos.length" class="sb" :class="[`sb--${variante}`]">
    <h2 class="sb__title news-title-serif">{{ titulo }}</h2>
    <ol v-if="variante === 'numerada'" class="sb__list">
      <li v-for="(a, i) in articulos" :key="a.id" class="sb__item">
        <span class="sb__idx">{{ i + 1 }}</span>
        <NuxtLink :to="a.path" class="sb__link">{{ a.title }}</NuxtLink>
        <span class="sb__cat">{{ a.categoria }}</span>
      </li>
    </ol>
    <ul v-else-if="variante === 'tarjetas'" class="sb__cards">
      <li v-for="(a, i) in articulos" :key="a.id" class="sb__card">
        <span class="sb__card-idx">{{ i + 1 }}</span>
        <NuxtLink :to="a.path" class="sb__card-link">{{ a.title }}</NuxtLink>
        <span class="sb__card-cat">{{ a.categoria }}</span>
      </li>
    </ul>
    <ul v-else class="sb__minimal">
      <li v-for="a in articulos" :key="a.id" class="sb__minimal-item">
        <NuxtLink :to="a.path" class="sb__minimal-link">{{ a.title }}</NuxtLink>
        <span class="sb__minimal-cat">{{ a.categoria }}</span>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sb {
  border: 1px solid var(--news-border);
  padding: 1rem;
  border-radius: 4px;
  position: sticky;
  top: 1rem;
}

.sb--numerada {
  background: var(--news-bg);
}

.sb--tarjetas {
  background: #fff;
  border-color: var(--news-border);
}

.sb--minimal {
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
}

.sb__title {
  font-size: 1.1rem;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #111;
}

.sb--minimal .sb__title {
  border-bottom-color: var(--news-border);
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

/* Tarjetas */
.sb__cards {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sb__card {
  margin: 0;
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--news-border);
  border-radius: 6px;
  background: var(--news-bg);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 0.5rem;
  align-items: start;
}

.sb__card-idx {
  grid-row: 1 / span 2;
  align-self: center;
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--news-red);
  min-width: 1.25rem;
}

.sb__card-link {
  grid-column: 2;
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 1.35;
}

.sb__card-link:hover {
  color: var(--news-red);
}

.sb__card-cat {
  grid-column: 2;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--news-muted);
}

/* Minimal */
.sb__minimal {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sb__minimal-item {
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--news-border);
}

.sb__minimal-item:last-child {
  border-bottom: none;
}

.sb__minimal-link {
  display: block;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.35;
}

.sb__minimal-link:hover {
  color: var(--news-red);
}

.sb__minimal-cat {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--news-muted);
}
</style>
