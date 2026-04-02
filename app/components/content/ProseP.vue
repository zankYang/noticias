<template>
  <p class="prose-p">
    <slot />
  </p>
</template>

<style scoped>
.prose-p {
  line-height: 1.7;
  margin: 0 0 1.15rem;
  font-size: inherit;
}

/* Drop cap: el editor puede aplicar .letra-capital al wrapper o usarlo via ::first-letter en el primer hijo */
:deep(.news-prose > &:first-child::first-letter) {
  font-family: var(--news-serif);
  font-size: 3.2em;
  float: left;
  line-height: 0.8;
  margin: 0.05em 0.12em 0 0;
  color: var(--color-primary);
  font-weight: 700;
}
</style>
