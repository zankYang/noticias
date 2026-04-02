<script setup lang="ts">
const props = withDefaults(defineProps<{
  fecha?: string
  tipo?: 'correccion' | 'actualizacion' | 'aclaracion'
}>(), {
  tipo: 'actualizacion'
})

const etiquetas: Record<string, string> = {
  correccion: 'Corrección',
  actualizacion: 'Actualización',
  aclaracion: 'Aclaración'
}

const iconos: Record<string, string> = {
  correccion: '✏️',
  actualizacion: '🔄',
  aclaracion: '💡'
}
</script>

<template>
  <aside class="correccion" :class="`correccion--${props.tipo}`">
    <div class="correccion__header">
      <span class="correccion__icono" aria-hidden="true">{{ iconos[props.tipo] }}</span>
      <span class="correccion__etiqueta">{{ etiquetas[props.tipo] }}</span>
      <time v-if="props.fecha" class="correccion__fecha">{{ props.fecha }}</time>
    </div>
    <div class="correccion__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.correccion {
  margin: 1.5rem 0;
  padding: 0.85rem 1.15rem;
  border-radius: 6px;
  font-size: 0.9rem;
  line-height: 1.5;
  border: 1px dashed;
}

.correccion--correccion {
  border-color: #ef4444;
  background: #fef2f2;
}

.correccion--actualizacion {
  border-color: #3b82f6;
  background: #eff6ff;
}

.correccion--aclaracion {
  border-color: #f59e0b;
  background: #fffbeb;
}

.correccion__header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}

.correccion__icono {
  font-size: 1rem;
}

.correccion__etiqueta {
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.correccion__fecha {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--news-muted);
}

.correccion__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
