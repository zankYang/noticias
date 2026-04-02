<script setup lang="ts">
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = withDefaults(defineProps<{
  antes: string
  despues: string
  altAntes?: string
  altDespues?: string
}>(), {
  altAntes: 'Antes',
  altDespues: 'Después'
})

const config = useRuntimeConfig()
const sliderValue = ref(50)

function imgUrl(src: string) {
  return cloudinaryDeliveryUrl(src, {
    cloudName: config.public.cloudinaryCloudName as string,
    width: 960,
    height: 540,
    crop: 'fill',
    gravity: 'auto'
  })
}
</script>

<template>
  <figure class="img-comp">
    <div class="img-comp__container">
      <img :src="imgUrl(props.despues)" :alt="props.altDespues" class="img-comp__bg" />
      <div class="img-comp__overlay" :style="{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }">
        <img :src="imgUrl(props.antes)" :alt="props.altAntes" />
      </div>
      <input
        v-model.number="sliderValue"
        type="range"
        min="0"
        max="100"
        class="img-comp__slider"
        :aria-label="`Comparar: ${props.altAntes} / ${props.altDespues}`"
      />
      <div class="img-comp__line" :style="{ left: `${sliderValue}%` }" aria-hidden="true">
        <span class="img-comp__handle">⟺</span>
      </div>
    </div>
    <figcaption class="img-comp__labels">
      <span>{{ props.altAntes }}</span>
      <span>{{ props.altDespues }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.img-comp {
  margin: 1.5rem 0;
}

.img-comp__container {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  line-height: 0;
}

.img-comp__bg {
  width: 100%;
  display: block;
}

.img-comp__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.img-comp__overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-comp__slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: col-resize;
  z-index: 3;
}

.img-comp__line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #fff;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.img-comp__handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.img-comp__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
}
</style>
