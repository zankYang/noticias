<script setup lang="ts">
const props = withDefaults(defineProps<{
  texto: string
  posicion?: 'arriba' | 'abajo'
  color?: string
  fondo?: string
}>(), {
  posicion: 'arriba',
  color: '#fff',
  fondo: 'var(--color-secondary)'
})
</script>

<template>
  <span
    class="tooltip"
    :class="`tooltip--${props.posicion}`"
    :data-tip="props.texto"
    :style="{ '--tip-bg': props.fondo, '--tip-color': props.color }"
  >
    <slot />
  </span>
</template>

<style scoped>
.tooltip {
  position: relative;
  cursor: help;
  border-bottom: 1px dotted var(--color-primary);
}

.tooltip::after {
  content: attr(data-tip);
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  padding: 0.35rem 0.55rem;
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.3;
  white-space: normal;
  max-width: 220px;
  width: max-content;
  background: var(--tip-bg);
  color: var(--tip-color);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
  z-index: 50;
}

.tooltip--arriba::after {
  bottom: 100%;
  margin-bottom: 6px;
}

.tooltip--abajo::after {
  top: 100%;
  margin-top: 6px;
}

.tooltip:hover::after,
.tooltip:focus-within::after {
  opacity: 1;
  visibility: visible;
}

.tooltip--arriba:hover::after {
  transform: translateX(-50%) translateY(-2px);
}

.tooltip--abajo:hover::after {
  transform: translateX(-50%) translateY(2px);
}
</style>
