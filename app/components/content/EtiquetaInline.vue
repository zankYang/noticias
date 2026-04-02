<script setup lang="ts">
const props = withDefaults(defineProps<{
  color?: string
  fondo?: string
  radio?: string
  tamano?: string
  icono?: string
}>(), {
  color: '#fff',
  fondo: 'var(--color-primary)',
  radio: '4px',
  tamano: '0.75rem'
})
</script>

<template>
  <span
    class="etiqueta-inline"
    :style="{
      color: props.color,
      background: props.fondo,
      borderRadius: props.radio,
      fontSize: props.tamano
    }"
  >
    <span v-if="props.icono" class="etiqueta-inline__icono" aria-hidden="true">{{ props.icono }}</span>
    <slot />
  </span>
</template>

<style scoped>
.etiqueta-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
  padding: 0.15em 0.45em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  vertical-align: middle;
  line-height: 1.2;
}

.etiqueta-inline__icono {
  font-size: 1em;
}
</style>
