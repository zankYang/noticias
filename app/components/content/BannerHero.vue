<script setup lang="ts">
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = withDefaults(defineProps<{
  imagen: string
  alto?: string
  oscurecimiento?: number
  posicionTexto?:
    | 'arriba-izquierda'
    | 'arriba-derecha'
    | 'centro'
    | 'abajo-izquierda'
    | 'abajo-derecha'
  color?: string
  fuente?: 'serif' | 'sans'
  tamano?: string
}>(), {
  alto: '380px',
  oscurecimiento: 50,
  posicionTexto: 'abajo-izquierda',
  color: '#fff',
  fuente: 'serif',
  tamano: '1.15rem'
})

const config = useRuntimeConfig()

const bgUrl = computed(() =>
  cloudinaryDeliveryUrl(props.imagen, {
    cloudName: config.public.cloudinaryCloudName as string,
    width: 1600,
    height: 900,
    crop: 'fill',
    gravity: 'auto',
    analytics: config.public.cloudinaryAnalytics as string | undefined
  })
)

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)'
}

const posicionFlex = computed((): { jc: string; ai: string } => {
  const p = props.posicionTexto
  const map: Record<string, { jc: string; ai: string }> = {
    'arriba-izquierda': { jc: 'flex-start', ai: 'flex-start' },
    'arriba-derecha': { jc: 'flex-start', ai: 'flex-end' },
    centro: { jc: 'center', ai: 'center' },
    'abajo-izquierda': { jc: 'flex-end', ai: 'flex-start' },
    'abajo-derecha': { jc: 'flex-end', ai: 'flex-end' }
  }
  return map[p] ?? { jc: 'flex-end', ai: 'flex-start' }
})
</script>

<template>
  <section
    class="banner-hero mdc-full-bleed"
    :style="{
      minHeight: props.alto,
      backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      color: props.color,
      fontFamily: fuenteMap[props.fuente],
      fontSize: props.tamano
    }"
  >
    <div
      class="banner-hero__overlay"
      :style="{ opacity: Math.min(1, Math.max(0, props.oscurecimiento / 100)) }"
    />
    <div
      class="banner-hero__content"
      :style="{
        justifyContent: posicionFlex.jc,
        alignItems: posicionFlex.ai,
        textAlign:
          posicionFlex.ai === 'flex-end'
            ? 'right'
            : posicionFlex.ai === 'center'
              ? 'center'
              : 'left'
      }"
    >
      <div class="banner-hero__inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner-hero {
  position: relative;
  margin: 2rem 0;
  background-size: cover;
  background-position: center;
}

.banner-hero__overlay {
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
}

.banner-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: inherit;
  padding: 1.5rem;
  box-sizing: border-box;
}

.banner-hero__inner {
  max-width: 42rem;
}

.banner-hero__inner :deep(h1),
.banner-hero__inner :deep(h2),
.banner-hero__inner :deep(h3) {
  color: inherit;
  margin-top: 0;
  border: none;
  padding: 0;
}

.banner-hero__inner :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
