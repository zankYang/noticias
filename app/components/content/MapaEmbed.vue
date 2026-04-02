<script setup lang="ts">
const props = withDefaults(defineProps<{
  url: string
  alto?: number
  titulo?: string
}>(), {
  alto: 400,
  titulo: 'Mapa'
})
</script>

<template>
  <figure class="mapa-embed">
    <div class="mapa-embed__wrapper" :style="{ height: `${props.alto}px` }">
      <iframe
        :src="props.url"
        :title="props.titulo"
        frameborder="0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
    <figcaption v-if="props.titulo" class="mapa-embed__caption">{{ props.titulo }}</figcaption>
  </figure>
</template>

<style scoped>
.mapa-embed {
  margin: 1.5rem 0;
}

.mapa-embed__wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--news-border);
}

.mapa-embed__wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.mapa-embed__caption {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  font-style: italic;
}
</style>
