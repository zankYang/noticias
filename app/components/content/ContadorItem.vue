<template>
  <div class="contador-item">
    <span class="contador-item__num" aria-hidden="true" />
    <div class="contador-item__contenido">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.contador-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  counter-increment: contador;
  padding: 0.75rem;
  background: var(--news-bg);
  border-radius: 6px;
  border: 1px solid var(--news-border);
}

.contador-item__num::before {
  content: counter(contador);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  flex-shrink: 0;
  font-family: var(--news-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: var(--color-primary);
  border-radius: 50%;
}

.contador-item__contenido {
  font-size: 0.93rem;
  line-height: 1.55;
  padding-top: 0.25rem;
}

.contador-item__contenido :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
