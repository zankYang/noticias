<script setup lang="ts">
import { useEstiloProps, type EstiloProps } from '~/composables/useEstiloProps'

const props = withDefaults(defineProps<EstiloProps>(), {
  padding: '1.25rem',
  radio: '8px'
})

const estilo = useEstiloProps(props)
</script>

<template>
  <div class="bloque-libre" :style="estilo">
    <slot />
  </div>
</template>

<style scoped>
.bloque-libre {
  margin: 1.5rem 0;
  overflow: hidden;
}

.bloque-libre :deep(p:last-child) {
  margin-bottom: 0;
}

.bloque-libre :deep(h1),
.bloque-libre :deep(h2),
.bloque-libre :deep(h3) {
  color: inherit;
}
</style>
