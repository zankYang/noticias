<script setup lang="ts">
const props = withDefaults(defineProps<{
  etiqueta?: string
  efecto?: 'blur' | 'oculto' | 'pixelado'
}>(), {
  etiqueta: 'Mostrar contenido',
  efecto: 'blur'
})

const revelado = ref(false)
</script>

<template>
  <div class="spoiler" :class="[`spoiler--${props.efecto}`, { 'spoiler--revelado': revelado }]">
    <button type="button" class="spoiler__btn" @click="revelado = !revelado">
      {{ revelado ? 'Ocultar' : props.etiqueta }}
    </button>
    <div class="spoiler__contenido" :aria-hidden="!revelado">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spoiler {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px dashed var(--news-border);
  border-radius: 8px;
  background: var(--news-bg);
}

.spoiler__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  margin-bottom: 0.65rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fff;
  background: var(--color-secondary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.spoiler__btn:hover {
  background: var(--color-primary);
}

.spoiler__contenido {
  transition: filter 0.35s ease, opacity 0.35s ease;
}

.spoiler:not(.spoiler--revelado) .spoiler__contenido {
  user-select: none;
}

.spoiler--blur:not(.spoiler--revelado) .spoiler__contenido {
  filter: blur(8px);
  opacity: 0.45;
  pointer-events: none;
}

.spoiler--oculto:not(.spoiler--revelado) .spoiler__contenido {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  pointer-events: none;
}

.spoiler--pixelado:not(.spoiler--revelado) .spoiler__contenido {
  filter: blur(3px) contrast(0.4);
  opacity: 0.35;
  pointer-events: none;
}

.spoiler__contenido :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
