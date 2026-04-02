<template>
  <div class="respuesta">
    <span class="respuesta__badge" aria-hidden="true">R</span>
    <div class="respuesta__texto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.respuesta {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--news-border);
}

.respuesta:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.respuesta__badge {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-secondary);
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 50%;
}

.respuesta__texto {
  font-size: 0.93rem;
  line-height: 1.6;
  color: var(--news-muted);
  padding-top: 0.15rem;
}

.respuesta__texto :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
