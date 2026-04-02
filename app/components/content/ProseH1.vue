<template>
  <h1 class="prose-h1">
    <slot />
    <span class="prose-h1__accent" aria-hidden="true" />
  </h1>
</template>

<style scoped>
.prose-h1 {
  font-family: var(--news-serif);
  font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 2rem 0 0.75rem;
  position: relative;
  padding-bottom: 0.6rem;
}

.prose-h1__accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 3rem;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
}
</style>
