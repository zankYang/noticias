<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
}>(), {
  titulo: 'En resumen'
})
</script>

<template>
  <aside class="resumen">
    <div class="resumen__header">
      <span class="resumen__icono" aria-hidden="true">📋</span>
      <span class="resumen__titulo">{{ props.titulo }}</span>
    </div>
    <div class="resumen__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.resumen {
  margin: 1.5rem 0;
  padding: 1.15rem 1.25rem;
  background: var(--color-secondary);
  color: #fff;
  border-radius: 8px;
}

.resumen__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.65rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.resumen__icono {
  font-size: 1.05rem;
}

.resumen__titulo {
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.resumen__body {
  font-size: 0.9rem;
  line-height: 1.55;
}

.resumen__body :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.resumen__body :deep(li) {
  padding: 0.3rem 0;
  padding-left: 1.15rem;
  position: relative;
}

.resumen__body :deep(li)::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
}

.resumen__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
