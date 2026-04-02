<script setup lang="ts">
const props = withDefaults(defineProps<{
  valor: string
  etiqueta?: string
  tendencia?: 'sube' | 'baja' | 'neutral'
  prefijo?: string
  sufijo?: string
}>(), {
  tendencia: 'neutral'
})

const flechas: Record<string, string> = { sube: '↑', baja: '↓', neutral: '' }
</script>

<template>
  <div class="estadistica" :class="`estadistica--${props.tendencia}`">
    <div class="estadistica__valor">
      <span v-if="props.prefijo" class="estadistica__afijo">{{ props.prefijo }}</span>
      {{ props.valor }}
      <span v-if="props.sufijo" class="estadistica__afijo">{{ props.sufijo }}</span>
      <span v-if="flechas[props.tendencia]" class="estadistica__flecha">{{ flechas[props.tendencia] }}</span>
    </div>
    <div v-if="props.etiqueta" class="estadistica__etiqueta">{{ props.etiqueta }}</div>
  </div>
</template>

<style scoped>
.estadistica {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--news-bg);
  border-radius: 8px;
  border: 1px solid var(--news-border);
  text-align: center;
}

.estadistica__valor {
  font-family: var(--news-serif);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-secondary);
}

.estadistica--sube .estadistica__valor { color: #16a34a; }
.estadistica--baja .estadistica__valor { color: #dc2626; }

.estadistica__afijo {
  font-size: 0.5em;
  vertical-align: super;
  opacity: 0.65;
}

.estadistica__flecha {
  font-size: 0.6em;
  margin-left: 0.15em;
}

.estadistica__etiqueta {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}
</style>
