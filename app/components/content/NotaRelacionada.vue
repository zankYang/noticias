<script setup lang="ts">
const props = defineProps<{
  url: string
  titulo: string
  descripcion?: string
}>()
</script>

<template>
  <NuxtLink :to="props.url" class="nota-relacionada">
    <span class="nota-relacionada__badge">Lee también</span>
    <span class="nota-relacionada__titulo">{{ props.titulo }}</span>
    <span v-if="props.descripcion" class="nota-relacionada__desc">{{ props.descripcion }}</span>
    <span class="nota-relacionada__flecha" aria-hidden="true">→</span>
  </NuxtLink>
</template>

<style scoped>
.nota-relacionada {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.5rem;
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.nota-relacionada:hover {
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(245, 130, 32, 0.1);
}

.nota-relacionada__badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary);
  background: rgba(245, 130, 32, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
}

.nota-relacionada__titulo {
  font-weight: 700;
  font-size: 1rem;
  flex: 1 0 100%;
}

.nota-relacionada__desc {
  font-size: 0.85rem;
  color: var(--news-muted);
  flex: 1 0 100%;
}

.nota-relacionada__flecha {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--color-primary);
  display: none;
}

@media (min-width: 640px) {
  .nota-relacionada {
    position: relative;
    padding-right: 2.5rem;
  }
  .nota-relacionada__flecha {
    display: block;
  }
}
</style>
