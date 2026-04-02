<template>
  <hr class="prose-hr" aria-hidden="true" />
</template>

<style scoped>
.prose-hr {
  border: none;
  margin: 2rem auto;
  text-align: center;
  height: auto;
  line-height: 1;
}

.prose-hr::before {
  content: '• • •';
  display: block;
  font-size: 1.1rem;
  letter-spacing: 0.6em;
  color: var(--news-border);
}
</style>
