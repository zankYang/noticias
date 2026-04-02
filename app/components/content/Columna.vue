<script setup lang="ts">
const props = withDefaults(defineProps<{
  fondo?: string
  padding?: string
  alineacion?: 'izquierda' | 'centro' | 'derecha'
  radio?: string
}>(), {
  padding: '0.75rem',
  alineacion: 'izquierda'
})

const alignMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right'
}

const estilo = computed(() => ({
  background: props.fondo,
  padding: props.padding,
  textAlign: (alignMap[props.alineacion] ?? 'left') as 'left' | 'center' | 'right',
  borderRadius: props.radio
}))
</script>

<template>
  <div class="columna" :style="estilo">
    <slot />
  </div>
</template>

<style scoped>
.columna {
  min-width: 0;
}

.columna :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
