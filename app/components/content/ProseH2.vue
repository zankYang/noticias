<template>
  <h2 class="prose-h2">
    <slot />
  </h2>
</template>

<style scoped>
.prose-h2 {
  font-family: var(--news-serif);
  font-weight: 700;
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 2rem 0 0.5rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--color-primary);
}
</style>
