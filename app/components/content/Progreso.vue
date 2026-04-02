<script setup lang="ts">
const props = withDefaults(defineProps<{
  valor?: number
  etiqueta?: string
  color?: string
  fondo?: string
  alto?: string
  animado?: boolean
}>(), {
  valor: 0,
  color: 'var(--color-primary)',
  fondo: 'var(--news-border)',
  alto: '10px',
  animado: true
})

const pct = computed(() => Math.min(100, Math.max(0, Number(props.valor))))
</script>

<template>
  <div class="progreso">
    <p v-if="props.etiqueta" class="progreso__etiqueta">{{ props.etiqueta }}</p>
    <div
      class="progreso__track"
      :style="{ height: props.alto, background: props.fondo }"
      role="progressbar"
      :aria-valuenow="pct"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="progreso__barra"
        :class="{ 'progreso__barra--animado': props.animado }"
        :style="{ width: `${pct}%`, background: props.color }"
      />
    </div>
  </div>
</template>

<style scoped>
.progreso {
  margin: 1.25rem 0;
}

.progreso__etiqueta {
  margin: 0 0 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--news-muted);
}

.progreso__track {
  border-radius: 999px;
  overflow: hidden;
}

.progreso__barra {
  height: 100%;
  border-radius: inherit;
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.progreso__barra--animado {
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
