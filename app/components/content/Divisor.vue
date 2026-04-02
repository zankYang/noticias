<script setup lang="ts">
const props = withDefaults(defineProps<{
  texto?: string
  color?: string
  grosor?: string
  estilo?: 'solido' | 'punteado' | 'degradado'
  fuente?: 'serif' | 'sans'
  tamano?: string
}>(), {
  color: 'var(--color-primary)',
  grosor: '1px',
  estilo: 'solido',
  fuente: 'serif',
  tamano: '0.85rem'
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)'
}

const bordeLinea = computed(() => {
  if (props.estilo === 'punteado') return `${props.grosor} dashed ${props.color}`
  if (props.estilo === 'degradado')
    return 'none'
  return `${props.grosor} solid ${props.color}`
})
</script>

<template>
  <div
    class="divisor"
    :class="{ 'divisor--degradado': props.estilo === 'degradado' }"
    :style="{ '--divisor-color': props.color }"
    role="separator"
  >
    <span class="divisor__linea" :style="{ borderTop: bordeLinea }" />
    <span
      v-if="props.texto"
      class="divisor__texto"
      :style="{
        color: props.color,
        fontFamily: fuenteMap[props.fuente],
        fontSize: props.tamano
      }"
    >
      {{ props.texto }}
    </span>
    <span class="divisor__linea" :style="{ borderTop: bordeLinea }" />
  </div>
</template>

<style scoped>
.divisor {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.divisor__linea {
  flex: 1;
  border-top-width: 1px;
}

.divisor--degradado .divisor__linea {
  height: 2px;
  border: none;
  background: linear-gradient(
    90deg,
    transparent,
    var(--divisor-color, var(--color-primary)),
    transparent
  );
}

.divisor__texto {
  flex-shrink: 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
