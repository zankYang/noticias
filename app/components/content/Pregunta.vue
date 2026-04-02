<template>
  <div class="pregunta">
    <span class="pregunta__badge" aria-hidden="true">P</span>
    <div class="pregunta__texto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pregunta {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  margin-bottom: 0.25rem;
}

.pregunta__badge {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 50%;
}

.pregunta__texto {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4;
  padding-top: 0.15rem;
}

.pregunta__texto :deep(p) {
  margin: 0;
}
</style>
