<template>
  <h4 class="prose-h4">
    <slot />
  </h4>
</template>

<style scoped>
.prose-h4 {
  font-family: var(--news-sans);
  font-weight: 600;
  font-size: 1rem;
  color: var(--news-muted);
  margin: 1.5rem 0 0.35rem;
}
</style>
