<script setup lang="ts">
const props = withDefaults(defineProps<{
  url: string
  titulo?: string
  ratio?: '16:9' | '4:3' | '1:1'
}>(), {
  ratio: '16:9'
})

const embedUrl = computed(() => {
  const u = props.url
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  const vimeoMatch = u.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return u
})

const ratioMap: Record<string, string> = { '16:9': '56.25%', '4:3': '75%', '1:1': '100%' }
const paddingRatio = computed(() => ratioMap[props.ratio] || '56.25%')
</script>

<template>
  <figure class="video-embed">
    <div class="video-embed__wrapper" :style="{ paddingBottom: paddingRatio }">
      <iframe
        :src="embedUrl"
        :title="props.titulo || 'Video'"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      />
    </div>
    <figcaption v-if="props.titulo" class="video-embed__caption">{{ props.titulo }}</figcaption>
  </figure>
</template>

<style scoped>
.video-embed {
  margin: 1.5rem 0;
}

.video-embed__wrapper {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  border-radius: 6px;
  background: #000;
}

.video-embed__wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-embed__caption {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  font-style: italic;
}
</style>
