<script setup lang="ts">
const props = withDefaults(defineProps<{
  estilo?: 'linea' | 'acento' | 'etiqueta' | 'banner' | 'subrayado'
  color?: string
  fondo?: string
  fuente?: 'serif' | 'sans'
  alineacion?: 'izquierda' | 'centro' | 'derecha'
  tamano?: string
}>(), {
  estilo: 'linea',
  color: 'var(--color-primary)',
  fuente: 'sans',
  alineacion: 'izquierda',
  tamano: '0.95rem'
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)'
}

const alignMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right'
}
</script>

<template>
  <div
    class="subtitular"
    :class="[
      `subtitular--${props.estilo}`,
      `subtitular--align-${props.alineacion}`
    ]"
    :style="{
      color: props.color,
      background: props.estilo === 'banner' ? props.fondo : undefined,
      fontFamily: fuenteMap[props.fuente] ?? fuenteMap.sans,
      fontSize: props.tamano,
      textAlign: (alignMap[props.alineacion] ?? 'left') as 'left' | 'center' | 'right'
    }"
  >
    <span class="subtitular__texto"><slot /></span>
  </div>
</template>

<style scoped>
.subtitular {
  margin: 1.5rem 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.subtitular--linea {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.subtitular--linea::after {
  content: '';
  flex: 1;
  height: 2px;
  background: currentColor;
  opacity: 0.35;
}

.subtitular--align-centro.subtitular--linea::before,
.subtitular--align-centro.subtitular--linea::after {
  content: '';
  flex: 1;
  height: 2px;
  background: currentColor;
  opacity: 0.35;
}

.subtitular--align-centro.subtitular--linea .subtitular__texto {
  flex-shrink: 0;
}

.subtitular--acento {
  border-left: 4px solid var(--color-primary);
  padding-left: 0.75rem;
}

.subtitular--etiqueta .subtitular__texto {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border: 2px solid currentColor;
  border-radius: 4px;
}

.subtitular--banner .subtitular__texto {
  display: inline-block;
  padding: 0.45rem 1rem;
  color: inherit;
}

.subtitular--banner {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
}

.subtitular--subrayado .subtitular__texto {
  border-bottom: 3px solid currentColor;
  padding-bottom: 0.2rem;
  display: inline-block;
}
</style>
