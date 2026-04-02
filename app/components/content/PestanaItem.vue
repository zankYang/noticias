<script setup lang="ts">
defineProps<{
  titulo: string
}>()
</script>

<template>
  <div class="pestana-item">
    <slot />
  </div>
</template>

<style scoped>
.pestana-item :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
