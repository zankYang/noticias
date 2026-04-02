<script setup lang="ts">
const props = withDefaults(defineProps<{
  titulo?: string
  inicio?: number
}>(), {
  inicio: 1
})
</script>

<template>
  <div class="contador-items" :style="{ counterReset: `contador ${props.inicio - 1}` }">
    <p v-if="props.titulo" class="contador-items__titulo">{{ props.titulo }}</p>
    <div class="contador-items__lista">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.contador-items {
  margin: 1.5rem 0;
}

.contador-items__titulo {
  font-family: var(--news-serif);
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
}

.contador-items__lista {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
