<script setup lang="ts">
const props = withDefaults(defineProps<{
  cantidad?: number
  gap?: string
  alineacionVertical?: 'inicio' | 'centro' | 'final'
  invertirMovil?: boolean
}>(), {
  cantidad: 2,
  gap: '1.25rem',
  alineacionVertical: 'inicio',
  invertirMovil: false
})

const cols = computed(() => Math.min(4, Math.max(2, props.cantidad)))

const alignMap: Record<string, string> = {
  inicio: 'start',
  centro: 'center',
  final: 'end'
}

const gridStyle = computed(() => ({
  gap: props.gap,
  alignItems: alignMap[props.alineacionVertical] || 'start',
  gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`
}))
</script>

<template>
  <div
    class="columnas"
    :class="{ 'columnas--invertir-movil': props.invertirMovil }"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.columnas {
  display: grid;
  margin: 1.5rem 0;
}

@media (max-width: 639px) {
  .columnas:not(.columnas--invertir-movil) {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .columnas--invertir-movil {
    display: flex !important;
    flex-direction: column-reverse;
    grid-template-columns: unset !important;
  }
}
</style>
