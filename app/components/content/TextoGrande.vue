<script setup lang="ts">
const props = withDefaults(defineProps<{
  fuente?: 'serif' | 'sans' | 'mono' | 'display'
  tamano?: 'enorme' | 'grande' | 'mediano'
  peso?: string | number
  color?: string
  gradienteTexto?: string
  alineacion?: 'izquierda' | 'centro' | 'derecha'
  interlineado?: string
  espaciadoLetras?: string
}>(), {
  tamano: 'grande',
  peso: 800,
  alineacion: 'centro',
  interlineado: '1.1'
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)',
  mono: "'Menlo', 'Consolas', monospace",
  display: "'Georgia', serif"
}

const tamanoMap: Record<string, string> = {
  enorme: 'clamp(2rem, 6vw, 3.5rem)',
  grande: 'clamp(1.5rem, 4vw, 2.5rem)',
  mediano: 'clamp(1.25rem, 3vw, 1.75rem)'
}

const alignMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right'
}

const estilo = computed(() => {
  const familia = fuenteMap[props.fuente ?? 'serif'] ?? 'var(--news-serif)'
  const fs = tamanoMap[props.tamano ?? 'grande'] ?? 'clamp(1.5rem, 4vw, 2.5rem)'
  const base: Record<string, string> = {
    fontFamily: familia,
    fontSize: fs,
    fontWeight: String(props.peso),
    lineHeight: props.interlineado,
    letterSpacing: props.espaciadoLetras || '',
    textAlign: alignMap[props.alineacion] ?? 'center'
  }

  if (props.gradienteTexto) {
    base.background = props.gradienteTexto
    base['-webkit-background-clip'] = 'text'
    base.backgroundClip = 'text'
    base.color = 'transparent'
    base['-webkit-text-fill-color'] = 'transparent'
  } else if (props.color) {
    base.color = props.color
  }

  return base
})
</script>

<template>
  <p class="texto-grande" :style="estilo">
    <slot />
  </p>
</template>

<style scoped>
.texto-grande {
  margin: 1.75rem 0;
}
</style>
