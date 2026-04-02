<script setup lang="ts">
const props = withDefaults(defineProps<{
  lineas?: number
  color?: string
  fuente?: 'serif' | 'sans' | 'display'
  fondo?: string
  estilo?: 'clasica' | 'moderna' | 'enmarcada'
}>(), {
  lineas: 3,
  color: 'var(--color-primary)',
  fuente: 'serif',
  estilo: 'clasica'
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)',
  display: "'Georgia', serif"
}
</script>

<template>
  <div
    class="letra-capital"
    :class="`letra-capital--${props.estilo}`"
    :style="{
      '--drop-lines': props.lineas,
      '--drop-color': props.color,
      '--drop-font': fuenteMap[props.fuente],
      '--drop-bg': props.fondo || 'transparent'
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.letra-capital {
  margin: 1.25rem 0;
  font-size: inherit;
  line-height: 1.7;
}

.letra-capital :deep(p:first-child)::first-letter {
  float: left;
  font-family: var(--drop-font);
  font-size: 3.5em;
  line-height: 0.85;
  margin: 0.05em 0.12em 0 0;
  color: var(--drop-color);
  font-weight: 700;
}

.letra-capital--moderna :deep(p:first-child)::first-letter {
  font-weight: 900;
  letter-spacing: -0.02em;
}

.letra-capital--enmarcada :deep(p:first-child)::first-letter {
  background: var(--drop-bg);
  padding: 0.08em 0.12em;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px var(--drop-color);
}

.letra-capital :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
