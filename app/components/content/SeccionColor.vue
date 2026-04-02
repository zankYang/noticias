<script setup lang="ts">
const props = withDefaults(defineProps<{
  fondo?: string
  color?: string
  gradiente?: string
  padding?: string
  alineacion?: 'izquierda' | 'centro' | 'derecha'
}>(), {
  fondo: 'var(--color-secondary)',
  color: '#fff',
  padding: '3rem 1.5rem',
  alineacion: 'centro'
})

const alineacionMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right'
}

const estilo = computed(() => ({
  background: props.gradiente || props.fondo,
  color: props.color,
  padding: props.padding,
  textAlign: (alineacionMap[props.alineacion] ?? 'center') as 'left' | 'center' | 'right'
}))
</script>

<template>
  <section class="seccion-color mdc-full-bleed" :style="estilo">
    <div class="seccion-color__inner">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.seccion-color {
  margin: 2rem 0;
}

.seccion-color__inner {
  max-width: 720px;
  margin-inline: auto;
}

.seccion-color__inner :deep(h1),
.seccion-color__inner :deep(h2),
.seccion-color__inner :deep(h3) {
  color: inherit;
  border: none;
  padding: 0;
}

.seccion-color__inner :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
