<script setup lang="ts">
const props = withDefaults(defineProps<{
  plantilla?: '2x2' | '3col' | 'editorial' | 'libre'
  gap?: string
  alto?: string
}>(), {
  plantilla: 'editorial',
  gap: '0.75rem'
})

const gridStyle = computed(() => {
  const g = { gap: props.gap }
  if (props.alto) Object.assign(g, { minHeight: props.alto })
  return g
})
</script>

<template>
  <div
    class="mosaico"
    :class="`mosaico--${props.plantilla}`"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.mosaico {
  display: grid;
  margin: 1.5rem 0;
}

.mosaico--2x2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, auto));
  grid-template-areas:
    'a b'
    'c d';
}

.mosaico--3col {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas: 'a b c';
}

.mosaico--editorial {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: auto auto;
  grid-template-areas:
    'principal lateral'
    'pie pie';
}

.mosaico--libre {
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

@media (max-width: 639px) {
  .mosaico--2x2,
  .mosaico--3col,
  .mosaico--editorial {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    grid-template-areas: none;
  }

  .mosaico--2x2 :deep(.mosaico-item),
  .mosaico--3col :deep(.mosaico-item),
  .mosaico--editorial :deep(.mosaico-item) {
    grid-area: unset !important;
  }
}
</style>
