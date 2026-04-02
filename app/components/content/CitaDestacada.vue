<script setup lang="ts">
const props = withDefaults(defineProps<{
  autor?: string
  cargo?: string
  alineacion?: 'centro' | 'izquierda' | 'derecha'
}>(), {
  alineacion: 'centro'
})
</script>

<template>
  <figure class="cita-destacada" :class="`cita-destacada--${props.alineacion}`">
    <span class="cita-destacada__comilla" aria-hidden="true">&ldquo;</span>
    <blockquote class="cita-destacada__texto">
      <slot />
    </blockquote>
    <figcaption v-if="props.autor" class="cita-destacada__atribucion">
      <strong>{{ props.autor }}</strong>
      <span v-if="props.cargo">, {{ props.cargo }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.cita-destacada {
  position: relative;
  margin: 2rem 0;
  padding: 1.5rem 2rem 1.25rem;
  border-top: 3px solid var(--color-primary);
  border-bottom: 3px solid var(--color-primary);
}

.cita-destacada--centro { text-align: center; }
.cita-destacada--derecha { text-align: right; }
.cita-destacada--izquierda { text-align: left; }

.cita-destacada__comilla {
  display: block;
  font-family: var(--news-serif);
  font-size: 4rem;
  line-height: 0.6;
  color: var(--color-primary);
  opacity: 0.3;
  margin-bottom: 0.25rem;
}

.cita-destacada__texto {
  font-family: var(--news-serif);
  font-size: clamp(1.15rem, 2.5vw, 1.4rem);
  line-height: 1.45;
  font-style: italic;
  margin: 0;
}

.cita-destacada__texto :deep(p:last-child) {
  margin-bottom: 0;
}

.cita-destacada__atribucion {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--news-muted);
  font-style: normal;
}
</style>
