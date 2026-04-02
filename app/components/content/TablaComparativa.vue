<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
}>(), {
  titulo: 'Comparativa'
})
</script>

<template>
  <div class="tabla-comparativa">
    <div class="tabla-comparativa__header">
      <span class="tabla-comparativa__icono" aria-hidden="true">⚖️</span>
      <span class="tabla-comparativa__titulo">{{ props.titulo }}</span>
    </div>
    <div class="tabla-comparativa__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tabla-comparativa {
  margin: 1.5rem 0;
  border: 1px solid var(--news-border);
  border-radius: 8px;
  overflow: hidden;
}

.tabla-comparativa__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1rem;
  background: var(--color-secondary);
  color: #fff;
}

.tabla-comparativa__icono {
  font-size: 1rem;
}

.tabla-comparativa__titulo {
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tabla-comparativa__body {
  overflow-x: auto;
}

.tabla-comparativa__body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.tabla-comparativa__body :deep(th) {
  padding: 0.6rem 0.85rem;
  text-align: left;
  font-weight: 700;
  background: var(--news-bg);
  border-bottom: 2px solid var(--news-border);
  font-size: 0.8rem;
}

.tabla-comparativa__body :deep(td) {
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid var(--news-border);
}

.tabla-comparativa__body :deep(tr:last-child td) {
  border-bottom: none;
}

.tabla-comparativa__body :deep(tr:hover td) {
  background: #fefce8;
}
</style>
