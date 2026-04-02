<script setup lang="ts">
const props = withDefaults(defineProps<{
  estilo?: 'puntos' | 'linea' | 'ornamento' | 'espacio'
}>(), {
  estilo: 'ornamento'
})
</script>

<template>
  <div class="separador" :class="`separador--${props.estilo}`" role="separator" aria-hidden="true" />
</template>

<style scoped>
.separador {
  margin: 2rem auto;
  text-align: center;
}

.separador--puntos::before {
  content: '• • •';
  font-size: 1.1rem;
  letter-spacing: 0.6em;
  color: var(--news-border);
}

.separador--linea {
  height: 1px;
  max-width: 60%;
  background: var(--news-border);
}

.separador--ornamento::before {
  content: '❧';
  font-size: 1.5rem;
  color: var(--color-primary);
  opacity: 0.5;
}

.separador--espacio {
  height: 2.5rem;
}
</style>
