<template>
  <blockquote class="prose-blockquote">
    <span class="prose-blockquote__mark" aria-hidden="true">"</span>
    <div class="prose-blockquote__body">
      <slot />
    </div>
  </blockquote>
</template>

<style scoped>
.prose-blockquote {
  position: relative;
  margin: 1.75rem 0;
  padding: 1.25rem 1.5rem 1.25rem 1.75rem;
  border-left: 4px solid var(--color-primary);
  background: var(--news-bg);
  border-radius: 0 6px 6px 0;
  font-family: var(--news-serif);
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--news-text);
}

.prose-blockquote__mark {
  position: absolute;
  top: -0.15rem;
  left: 0.6rem;
  font-size: 3rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.25;
  font-family: var(--news-serif);
  pointer-events: none;
}

.prose-blockquote__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
