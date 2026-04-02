<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <figure class="prose-img">
    <img
      :src="props.src"
      :alt="props.alt || ''"
      :width="props.width || undefined"
      :height="props.height || undefined"
      loading="lazy"
      decoding="async"
    />
    <figcaption v-if="props.alt" class="prose-img__caption">
      {{ props.alt }}
    </figcaption>
  </figure>
</template>

<style scoped>
.prose-img {
  margin: 1.5rem 0;
}

.prose-img img {
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.prose-img__caption {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  line-height: 1.35;
  font-style: italic;
}
</style>
