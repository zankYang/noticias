<script setup lang="ts">
const props = withDefaults(defineProps<{
  desenfoque?: number
  opacidad?: number
  borde?: string
  fondo?: string
  color?: string
  radio?: string
}>(), {
  desenfoque: 12,
  opacidad: 0.2,
  borde: '1px solid rgba(255,255,255,0.35)',
  fondo: 'rgba(255,255,255,0.12)',
  radio: '16px'
})

const estilo = computed(() => ({
  backdropFilter: `blur(${props.desenfoque}px)`,
  WebkitBackdropFilter: `blur(${props.desenfoque}px)`,
  background: props.fondo,
  border: props.borde,
  color: props.color,
  borderRadius: props.radio,
  '--glass-opacity': props.opacidad
}))
</script>

<template>
  <div class="glassmorphism" :style="estilo">
    <slot />
  </div>
</template>

<style scoped>
.glassmorphism {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.glassmorphism :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
