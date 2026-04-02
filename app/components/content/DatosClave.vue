<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
}>(), {
  titulo: 'Datos clave'
})
</script>

<template>
  <aside class="datos-clave">
    <div class="datos-clave__header">
      <span class="datos-clave__icono" aria-hidden="true">📊</span>
      <span class="datos-clave__titulo">{{ props.titulo }}</span>
    </div>
    <div class="datos-clave__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.datos-clave {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: linear-gradient(135deg, #fff7ed 0%, #fff 60%);
  border: 1px solid var(--color-primary);
  border-radius: 8px;
}

.datos-clave__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.datos-clave__icono {
  font-size: 1.1rem;
}

.datos-clave__titulo {
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary-hover);
}

.datos-clave__body :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.datos-clave__body :deep(li) {
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.35rem;
  background: #fff;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  border-left: 3px solid var(--color-primary);
}
</style>
