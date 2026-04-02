<script setup lang="ts">
const props = withDefaults(defineProps<{
  tipo?: 'info' | 'advertencia' | 'urgente' | 'exito'
  titulo?: string
}>(), {
  tipo: 'info'
})

const iconos: Record<string, string> = {
  info: 'ℹ️',
  advertencia: '⚠️',
  urgente: '🔴',
  exito: '✅'
}
</script>

<template>
  <aside class="alerta" :class="`alerta--${props.tipo}`" role="alert">
    <div class="alerta__header" v-if="props.titulo">
      <span class="alerta__icono" aria-hidden="true">{{ iconos[props.tipo] }}</span>
      <span class="alerta__titulo">{{ props.titulo }}</span>
    </div>
    <div class="alerta__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.alerta {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  border-left: 4px solid;
  font-size: 0.95rem;
  line-height: 1.55;
}

.alerta--info {
  border-color: #3b82f6;
  background: #eff6ff;
}

.alerta--advertencia {
  border-color: #f59e0b;
  background: #fffbeb;
}

.alerta--urgente {
  border-color: #ef4444;
  background: #fef2f2;
}

.alerta--exito {
  border-color: #22c55e;
  background: #f0fdf4;
}

.alerta__header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.alerta__icono {
  font-size: 1.1rem;
}

.alerta__titulo {
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.alerta__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
