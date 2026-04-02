<template>
  <div class="prose-table-wrapper">
    <table class="prose-table">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.prose-table-wrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 6px;
  border: 1px solid var(--news-border);
}

.prose-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  line-height: 1.45;
}

.prose-table :deep(thead) {
  background: var(--color-secondary);
  color: #fff;
}

.prose-table :deep(th) {
  padding: 0.65rem 0.85rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.prose-table :deep(td) {
  padding: 0.6rem 0.85rem;
  border-top: 1px solid var(--news-border);
}

.prose-table :deep(tbody tr:hover) {
  background: var(--news-bg);
}
</style>
