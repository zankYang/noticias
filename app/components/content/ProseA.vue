<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const isExternal = computed(() => {
  if (!props.href) return false
  return /^https?:\/\//.test(props.href)
})
</script>

<template>
  <a
    class="prose-a"
    :href="props.href"
    :target="isExternal ? '_blank' : props.target"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="isExternal" class="prose-a__ext" aria-label="(enlace externo)">&#8599;</span>
  </a>
</template>

<style scoped>
.prose-a {
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 2px;
  transition: text-decoration-color 0.2s;
}

.prose-a:hover {
  text-decoration-color: var(--color-primary);
}

.prose-a__ext {
  display: inline-block;
  font-size: 0.75em;
  margin-left: 0.15em;
  vertical-align: super;
}
</style>
