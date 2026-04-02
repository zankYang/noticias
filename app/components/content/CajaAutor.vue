<script setup lang="ts">
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = defineProps<{
  nombre: string
  imagen?: string
  twitter?: string
}>()

const config = useRuntimeConfig()

const imgSrc = computed(() =>
  props.imagen
    ? cloudinaryDeliveryUrl(props.imagen, {
        cloudName: config.public.cloudinaryCloudName as string,
        width: 100,
        height: 100,
        crop: 'fill',
        gravity: 'face'
      })
    : ''
)

const twitterUrl = computed(() => {
  if (!props.twitter) return ''
  const handle = props.twitter.replace(/^@/, '')
  return `https://x.com/${handle}`
})
</script>

<template>
  <aside class="caja-autor">
    <div v-if="imgSrc" class="caja-autor__avatar">
      <img :src="imgSrc" :alt="props.nombre" width="72" height="72" loading="lazy" />
    </div>
    <div class="caja-autor__info">
      <p class="caja-autor__nombre">{{ props.nombre }}</p>
      <div class="caja-autor__bio">
        <slot />
      </div>
      <a v-if="twitterUrl" :href="twitterUrl" target="_blank" rel="noopener noreferrer" class="caja-autor__social">
        {{ props.twitter }}
      </a>
    </div>
  </aside>
</template>

<style scoped>
.caja-autor {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 2rem 0;
  padding: 1.25rem;
  border-top: 3px solid var(--color-primary);
  background: var(--news-bg);
  border-radius: 0 0 8px 8px;
}

.caja-autor__avatar img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
}

.caja-autor__nombre {
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
}

.caja-autor__bio {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--news-muted);
}

.caja-autor__bio :deep(p) {
  margin: 0;
}

.caja-autor__social {
  display: inline-block;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-primary);
  font-weight: 600;
}

.caja-autor__social:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .caja-autor {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
