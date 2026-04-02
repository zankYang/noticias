<script setup lang="ts">
import { cloudinaryRawUploadUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = defineProps<{
  src: string
  alt?: string
  pie?: string
}>()

const config = useRuntimeConfig()

const imgSrc = computed(() =>
  cloudinaryRawUploadUrl(props.src, config.public.cloudinaryCloudName as string)
)

const expanded = ref(false)
</script>

<template>
  <figure class="infografia" :class="{ 'infografia--expanded': expanded }">
    <div class="infografia__wrapper" @click="expanded = !expanded">
      <img :src="imgSrc" :alt="props.alt || ''" loading="lazy" decoding="async" />
      <span class="infografia__zoom" aria-hidden="true">{{ expanded ? '✕' : '🔍' }}</span>
    </div>
    <figcaption v-if="props.pie" class="infografia__caption">{{ props.pie }}</figcaption>
  </figure>
</template>

<style scoped>
.infografia {
  margin: 1.5rem 0;
}

.infografia__wrapper {
  position: relative;
  cursor: zoom-in;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--news-border);
}

.infografia--expanded .infografia__wrapper {
  cursor: zoom-out;
}

.infografia__wrapper img {
  width: 100%;
  transition: transform 0.3s;
}

.infografia--expanded .infografia__wrapper img {
  transform: scale(1.5);
  transform-origin: center;
}

.infografia__zoom {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  pointer-events: none;
}

.infografia__caption {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  font-style: italic;
}
</style>
