<script setup lang="ts">
const props = withDefaults(defineProps<{
  nombre: string
  valor: string
  cambio?: string
  tendencia?: 'sube' | 'baja' | 'neutral'
}>(), {
  tendencia: 'neutral'
})

const flechas: Record<string, string> = { sube: '▲', baja: '▼', neutral: '—' }
</script>

<template>
  <span class="indicador" :class="`indicador--${props.tendencia}`">
    <span class="indicador__nombre">{{ props.nombre }}</span>
    <span class="indicador__valor">{{ props.valor }}</span>
    <span v-if="props.cambio" class="indicador__cambio">
      <span class="indicador__flecha">{{ flechas[props.tendencia] }}</span>
      {{ props.cambio }}
    </span>
  </span>
</template>

<style scoped>
.indicador {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  border-radius: 4px;
  font-size: 0.8rem;
  margin: 0.25rem;
  white-space: nowrap;
}

.indicador__nombre {
  font-weight: 600;
  color: var(--news-muted);
}

.indicador__valor {
  font-weight: 700;
  color: var(--news-text);
}

.indicador__cambio {
  font-size: 0.75rem;
}

.indicador--sube .indicador__cambio { color: #16a34a; }
.indicador--baja .indicador__cambio { color: #dc2626; }
.indicador--neutral .indicador__cambio { color: var(--news-muted); }

.indicador__flecha {
  font-size: 0.6rem;
}
</style>
