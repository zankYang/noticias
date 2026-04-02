<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
}>(), {
  titulo: 'Contexto'
})
</script>

<template>
  <aside class="contexto">
    <div class="contexto__header">
      <span class="contexto__icono" aria-hidden="true">🕐</span>
      <span class="contexto__titulo">{{ props.titulo }}</span>
    </div>
    <div class="contexto__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.contexto {
  margin: 1.5rem 0;
  padding: 1.15rem 1.25rem;
  background: #fafaf9;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  position: relative;
}

.contexto::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%);
  border-radius: 8px 8px 0 0;
}

.contexto__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.contexto__icono {
  font-size: 1.05rem;
}

.contexto__titulo {
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-secondary);
}

.contexto__body {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #44403c;
}

.contexto__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
