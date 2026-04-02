<template>
  <div class="cronologia">
    <slot />
  </div>
</template>

<style scoped>
.cronologia {
  margin: 1.5rem 0;
  position: relative;
  padding-left: 2rem;
}

.cronologia::before {
  content: '';
  position: absolute;
  left: 0.55rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--news-border);
}
</style>
