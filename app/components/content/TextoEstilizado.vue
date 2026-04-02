<script setup lang="ts">
const props = withDefaults(defineProps<{
  color?: string
  fondo?: string
  tamano?: string
  peso?: string | number
  fuente?: 'serif' | 'sans' | 'mono'
  transform?: 'mayusculas' | 'capitalizar' | 'normal'
  decoracion?: 'subrayado' | 'tachado' | 'ninguna'
  resaltado?: boolean
}>(), {
  resaltado: false
})

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)',
  mono: "'Menlo', 'Consolas', monospace"
}

const transformMap: Record<string, string> = {
  mayusculas: 'uppercase',
  capitalizar: 'capitalize',
  normal: 'none'
}

const decoracionMap: Record<string, string> = {
  subrayado: 'underline',
  tachado: 'line-through',
  ninguna: 'none'
}

const estilo = computed(() => {
  const s: Record<string, string> = {}
  if (props.color) s.color = props.color
  if (props.tamano) s.fontSize = props.tamano
  if (props.peso) s.fontWeight = String(props.peso)
  if (props.fuente && fuenteMap[props.fuente]) s.fontFamily = fuenteMap[props.fuente]!
  if (props.transform && transformMap[props.transform])
    s.textTransform = transformMap[props.transform]!
  if (props.decoracion && decoracionMap[props.decoracion])
    s.textDecoration = decoracionMap[props.decoracion]!
  if (props.resaltado) {
    s.background = props.fondo || 'linear-gradient(180deg, transparent 55%, rgba(245,130,32,0.3) 55%)'
  } else if (props.fondo) {
    s.background = props.fondo
    s.padding = '0.1em 0.3em'
    s.borderRadius = '3px'
  }
  return s
})
</script>

<template>
  <span class="texto-estilizado" :style="estilo"><slot /></span>
</template>

<style scoped>
.texto-estilizado {
  display: inline;
}
</style>
