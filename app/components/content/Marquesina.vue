<script setup lang="ts">
const props = withDefaults(defineProps<{
  velocidad?: 'lenta' | 'normal' | 'rapida'
  color?: string
  fondo?: string
  fuente?: 'serif' | 'sans' | 'mono'
  tamano?: string
  pausaHover?: boolean
}>(), {
  velocidad: 'normal',
  color: 'var(--color-primary)',
  fondo: 'var(--color-secondary)',
  fuente: 'sans',
  tamano: '0.85rem',
  pausaHover: true
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)',
  mono: "'Menlo', monospace"
}

const duracion = computed(() => {
  const d = { lenta: '40s', normal: '28s', rapida: '18s' }
  return d[props.velocidad]
})
</script>

<template>
  <div
    class="marquesina mdc-full-bleed"
    :class="{ 'marquesina--pausa-hover': props.pausaHover }"
    :style="{
      background: props.fondo,
      color: props.color,
      fontFamily: fuenteMap[props.fuente],
      fontSize: props.tamano,
      '--marquesina-duracion': duracion
    }"
    role="marquee"
  >
    <div class="marquesina__track">
      <span class="marquesina__texto"><slot /></span>
      <span class="marquesina__texto" aria-hidden="true"><slot /></span>
    </div>
  </div>
</template>

<style scoped>
.marquesina {
  overflow: hidden;
  padding: 0.55rem 0;
  margin: 1.25rem 0;
}

.marquesina__track {
  display: flex;
  width: max-content;
  animation: marquesina-scroll var(--marquesina-duracion, 28s) linear infinite;
  gap: 3rem;
}

.marquesina--pausa-hover:hover .marquesina__track {
  animation-play-state: paused;
}

.marquesina__texto {
  flex-shrink: 0;
  padding-right: 3rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

@keyframes marquesina-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
