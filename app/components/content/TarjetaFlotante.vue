<script setup lang="ts">
import { useEstiloProps, type EstiloProps } from '~/composables/useEstiloProps'

const props = withDefaults(
  defineProps<
    EstiloProps & {
      posicion?: 'izquierda' | 'derecha' | 'centro'
      ancho?: string
    }
  >(),
  {
    posicion: 'derecha',
    ancho: '280px',
    fondo: '#fffbeb',
    padding: '1rem 1.15rem',
    radio: '12px',
    sombra: 'grande',
    rotacion: '-1deg'
  }
)

const estiloBase = useEstiloProps(props)

const estilo = computed(() => ({
  ...estiloBase.value,
  width: props.ancho,
  maxWidth: '100%',
  float:
    props.posicion === 'izquierda'
      ? ('left' as const)
      : props.posicion === 'derecha'
        ? ('right' as const)
        : ('none' as const),
  margin:
    props.posicion === 'centro'
      ? '1rem auto'
      : props.posicion === 'izquierda'
        ? '0.5rem 1.25rem 1rem 0'
        : '0.5rem 0 1rem 1.25rem'
}))
</script>

<template>
  <aside class="tarjeta-flotante" :style="estilo">
    <slot />
  </aside>
</template>

<style scoped>
.tarjeta-flotante {
  font-size: 0.92rem;
  line-height: 1.5;
}

.tarjeta-flotante :deep(p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 639px) {
  .tarjeta-flotante {
    float: none !important;
    width: 100% !important;
    margin: 1.25rem 0 !important;
    transform: none !important;
  }
}
</style>
