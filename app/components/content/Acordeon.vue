<template>
  <div class="acordeon">
    <slot />
  </div>
</template>

<style scoped>
.acordeon {
  margin: 1.5rem 0;
  border: 1px solid var(--news-border);
  border-radius: 8px;
  overflow: hidden;
}
</style>
