<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
  icono?: string
}>(), {
  titulo: 'Para saber más',
  icono: '📌'
})
</script>

<template>
  <aside class="caja-informativa">
    <div class="caja-informativa__header">
      <span class="caja-informativa__icono" aria-hidden="true">{{ props.icono }}</span>
      <span class="caja-informativa__titulo">{{ props.titulo }}</span>
    </div>
    <div class="caja-informativa__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.caja-informativa {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  border-radius: 8px;
}

.caja-informativa__header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--news-border);
}

.caja-informativa__icono {
  font-size: 1.15rem;
}

.caja-informativa__titulo {
  font-weight: 700;
  font-size: 0.95rem;
}

.caja-informativa__body {
  font-size: 0.93rem;
  line-height: 1.6;
}

.caja-informativa__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
