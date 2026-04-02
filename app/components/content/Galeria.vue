<script setup lang="ts">
const props = withDefaults(defineProps<{
  columnas?: number
  gap?: string
}>(), {
  columnas: 3,
  gap: '0.5rem'
})

const cols = computed(() => Math.min(4, Math.max(1, props.columnas)))
</script>

<template>
  <div
    class="galeria"
    :style="{ '--galeria-cols': cols, '--galeria-gap': props.gap }"
  >
    <slot />
  </div>
</template>

<style scoped>
.galeria {
  display: grid;
  grid-template-columns: repeat(var(--galeria-cols), 1fr);
  gap: var(--galeria-gap);
  margin: 1.5rem 0;
}

.galeria :deep(figure),
.galeria :deep(.prose-img) {
  margin: 0;
}

.galeria :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  aspect-ratio: 4/3;
  cursor: zoom-in;
  transition: transform 0.2s;
}

.galeria :deep(img:hover) {
  transform: scale(1.02);
}

.galeria :deep(figcaption) {
  font-size: 0.75rem;
}

@media (max-width: 639px) {
  .galeria {
    grid-template-columns: repeat(min(var(--galeria-cols), 2), 1fr);
  }
}
</style>
