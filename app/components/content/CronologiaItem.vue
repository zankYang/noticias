<script setup lang="ts">
const props = defineProps<{
  fecha: string
  titulo?: string
}>()
</script>

<template>
  <div class="cronologia-item">
    <span class="cronologia-item__dot" aria-hidden="true" />
    <time class="cronologia-item__fecha">{{ props.fecha }}</time>
    <p v-if="props.titulo" class="cronologia-item__titulo">{{ props.titulo }}</p>
    <div class="cronologia-item__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cronologia-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.cronologia-item:last-child {
  padding-bottom: 0;
}

.cronologia-item__dot {
  position: absolute;
  left: -2rem;
  top: 0.15rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px var(--color-primary);
  transform: translateX(calc(-50% + 0.55rem));
}

.cronologia-item__fecha {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-primary);
}

.cronologia-item__titulo {
  margin: 0.15rem 0 0.3rem;
  font-weight: 700;
  font-size: 1rem;
}

.cronologia-item__body {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--news-muted);
}

.cronologia-item__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
