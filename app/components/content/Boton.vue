<script setup lang="ts">
const props = withDefaults(defineProps<{
  url: string
  texto: string
  fondo?: string
  color?: string
  tamano?: 'chico' | 'mediano' | 'grande'
  icono?: string
  variante?: 'solido' | 'contorno' | 'fantasma'
  radio?: string
  completo?: boolean
}>(), {
  fondo: 'var(--color-primary)',
  color: '#fff',
  tamano: 'mediano',
  variante: 'solido',
  radio: '8px',
  completo: false
})

const paddingMap: Record<string, string> = {
  chico: '0.35rem 0.75rem',
  mediano: '0.55rem 1.15rem',
  grande: '0.75rem 1.5rem'
}

const fontMap: Record<string, string> = {
  chico: '0.8rem',
  mediano: '0.9rem',
  grande: '1rem'
}

const estilo = computed(() => {
  const p = paddingMap[props.tamano] ?? '0.55rem 1.15rem'
  const fs = fontMap[props.tamano] ?? '0.9rem'
  const base: Record<string, string> = {
    borderRadius: props.radio ?? '8px',
    padding: p,
    fontSize: fs,
    width: props.completo ? '100%' : 'auto',
    justifyContent: 'center',
    textAlign: 'center'
  }
  if (props.variante === 'solido') {
    base.background = props.fondo
    base.color = props.color
    base.border = '2px solid transparent'
  } else if (props.variante === 'contorno') {
    base.background = 'transparent'
    base.color = props.fondo
    base.border = `2px solid ${props.fondo}`
  } else {
    base.background = 'transparent'
    base.color = props.fondo
    base.border = '2px solid transparent'
  }
  return base
})
</script>

<template>
  <div class="boton-wrap" :class="{ 'boton-wrap--completo': props.completo }">
    <NuxtLink :to="props.url" class="boton" :style="estilo">
      <span v-if="props.icono" class="boton__icono" aria-hidden="true">{{ props.icono }}</span>
      {{ props.texto }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.boton-wrap {
  margin: 1.25rem 0;
}

.boton-wrap--completo .boton {
  display: flex;
}

.boton {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.boton:hover {
  opacity: 0.92;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.boton__icono {
  font-size: 1.1em;
}
</style>
