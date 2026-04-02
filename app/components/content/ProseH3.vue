<template>
  <h3 class="prose-h3">
    <slot />
  </h3>
</template>

<style scoped>
.prose-h3 {
  font-family: var(--news-sans);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary);
  margin: 1.75rem 0 0.4rem;
}
</style>
