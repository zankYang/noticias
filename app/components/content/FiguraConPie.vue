<script setup lang="ts">
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  pie?: string
  credito?: string
  alineacion?: 'completa' | 'derecha' | 'izquierda'
}>(), {
  alt: '',
  alineacion: 'completa'
})

const config = useRuntimeConfig()

const imgSrc = computed(() =>
  cloudinaryDeliveryUrl(props.src, {
    cloudName: config.public.cloudinaryCloudName as string,
    width: 960,
    height: 540,
    crop: 'fill',
    gravity: 'auto'
  })
)
</script>

<template>
  <figure class="figura-con-pie" :class="`figura-con-pie--${props.alineacion}`">
    <img :src="imgSrc" :alt="props.alt" loading="lazy" decoding="async" />
    <figcaption v-if="props.pie || props.credito" class="figura-con-pie__caption">
      <span v-if="props.pie">{{ props.pie }}</span>
      <span v-if="props.credito" class="figura-con-pie__credito">{{ props.credito }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.figura-con-pie {
  margin: 1.5rem 0;
}

.figura-con-pie img {
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.figura-con-pie--derecha {
  float: right;
  max-width: 50%;
  margin: 0.5rem 0 1rem 1.5rem;
}

.figura-con-pie--izquierda {
  float: left;
  max-width: 50%;
  margin: 0.5rem 1.5rem 1rem 0;
}

.figura-con-pie__caption {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
  line-height: 1.35;
}

.figura-con-pie__credito {
  font-style: italic;
  margin-left: auto;
}

@media (max-width: 639px) {
  .figura-con-pie--derecha,
  .figura-con-pie--izquierda {
    float: none;
    max-width: 100%;
    margin: 1.5rem 0;
  }
}
</style>
