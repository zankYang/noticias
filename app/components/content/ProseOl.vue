<template>
  <ol class="prose-ol">
    <slot />
  </ol>
</template>

<style scoped>
.prose-ol {
  margin: 1rem 0;
  padding-left: 0;
  list-style: none;
  counter-reset: prose-counter;
}

.prose-ol :deep(li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
  counter-increment: prose-counter;
}

.prose-ol :deep(li)::before {
  content: counter(prose-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: #fff;
  border-radius: 50%;
}
</style>
