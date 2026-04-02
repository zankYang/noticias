<script setup lang="ts">
const props = withDefaults(defineProps<{
  tamano?: 'grande' | 'normal'
}>(), {
  tamano: 'grande'
})
</script>

<template>
  <div class="entradilla" :class="`entradilla--${props.tamano}`">
    <slot />
  </div>
</template>

<style scoped>
.entradilla {
  margin: 1.25rem 0 1.5rem;
  font-family: var(--news-serif);
  line-height: 1.55;
  color: var(--news-text);
}

.entradilla--grande {
  font-size: 1.25rem;
  font-weight: 500;
}

.entradilla--normal {
  font-size: 1.1rem;
}

.entradilla :deep(p:last-child) {
  margin-bottom: 0;
}

.entradilla :deep(p:first-child::first-letter) {
  font-size: 3.2em;
  float: left;
  line-height: 0.8;
  margin: 0.05em 0.12em 0 0;
  color: var(--color-primary);
  font-weight: 700;
  font-family: var(--news-serif);
}
</style>
