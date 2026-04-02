<script setup lang="ts">
const props = defineProps<{
  titulo: string
}>()

const abierto = ref(false)
</script>

<template>
  <details class="acordeon-item" :open="abierto || undefined" @toggle="abierto = ($event.target as HTMLDetailsElement).open">
    <summary class="acordeon-item__header">
      <span class="acordeon-item__titulo">{{ props.titulo }}</span>
      <span class="acordeon-item__icono" :class="{ 'acordeon-item__icono--abierto': abierto }" aria-hidden="true">›</span>
    </summary>
    <div class="acordeon-item__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.acordeon-item {
  border-top: 1px solid var(--news-border);
}

.acordeon-item:first-child {
  border-top: none;
}

.acordeon-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.15rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  list-style: none;
  user-select: none;
  transition: background 0.15s;
}

.acordeon-item__header::-webkit-details-marker {
  display: none;
}

.acordeon-item__header:hover {
  background: var(--news-bg);
}

.acordeon-item__icono {
  font-size: 1.3rem;
  transition: transform 0.2s;
  color: var(--color-primary);
}

.acordeon-item__icono--abierto {
  transform: rotate(90deg);
}

.acordeon-item__body {
  padding: 0 1.15rem 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.acordeon-item__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
