<script setup lang="ts">
const props = withDefaults(defineProps<{
  area?: 'principal' | 'lateral' | 'pie' | 'a' | 'b' | 'c' | 'd'
  fondo?: string
  color?: string
  padding?: string
  alineacion?: 'izquierda' | 'centro' | 'derecha'
}>(), {
  padding: '1rem'
})

const alignMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right'
}

const estilo = computed(() => ({
  gridArea: props.area || undefined,
  background: props.fondo,
  color: props.color,
  padding: props.padding,
  textAlign: props.alineacion
    ? (alignMap[props.alineacion] as 'left' | 'center' | 'right')
    : undefined
}))
</script>

<template>
  <div class="mosaico-item" :style="estilo">
    <slot />
  </div>
</template>

<style scoped>
.mosaico-item {
  min-width: 0;
  border-radius: 6px;
  border: 1px solid var(--news-border);
}

.mosaico-item :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
