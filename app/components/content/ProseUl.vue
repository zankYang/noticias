<template>
  <ul class="prose-ul">
    <slot />
  </ul>
</template>

<style scoped>
.prose-ul {
  margin: 1rem 0;
  padding-left: 0;
  list-style: none;
}

.prose-ul :deep(li) {
  position: relative;
  padding-left: 1.3rem;
  margin-bottom: 0.45rem;
  line-height: 1.6;
}

.prose-ul :deep(li)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}
</style>
