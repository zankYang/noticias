<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import { formatearFechaCorta } from '~/utils/fechaArticulo'

const props = withDefaults(
  defineProps<{
    article: ArticulosCollectionItem
    variant?: 'large' | 'medium' | 'compact' | 'overlay' | 'overlayCompact'
  }>(),
  { variant: 'medium' }
)

const esOverlay = computed(
  () => props.variant === 'overlay' || props.variant === 'overlayCompact'
)

const imagenSize = computed(() => {
  switch (props.variant) {
    case 'large':
      return { width: 800, height: 450 }
    case 'compact':
      return { width: 240, height: 180 }
    case 'overlay':
      return { width: 960, height: 960 }
    case 'overlayCompact':
      return { width: 720, height: 405 }
    default:
      return { width: 640, height: 360 }
  }
})

const imagenCloudOpts = computed(() => ({
  gravity:
    props.article.imagenGravedad === 'face' ? ('face' as const) : ('auto' as const)
}))

const imagenSrc = useCloudinaryArticleImage(
  () => props.article.imagen,
  imagenSize,
  imagenCloudOpts
)

const autorAvatarSrc = useCloudinaryAutorAvatar(() => props.article.autorImagen)
</script>

<template>
  <NuxtLink
    :to="article.path"
    class="nac"
    :class="[`nac--${props.variant}`, { 'nac--imagen-redondeada': article.imagenRedondeada && !esOverlay }]"
  >
    <div
      v-if="article.imagen"
      class="nac__media"
      :class="{ 'nac__media--overlay': esOverlay }"
    >
      <img
        :src="imagenSrc"
        :alt="article.title"
        :loading="esOverlay ? 'eager' : 'lazy'"
        :fetchpriority="variant === 'overlay' ? 'high' : undefined"
        :width="imagenSize.width"
        :height="imagenSize.height"
      />
    </div>
    <div
      v-else-if="esOverlay"
      class="nac__media nac__media--overlay nac__media--placeholder"
      aria-hidden="true"
    />
    <div class="nac__body">
      <span class="news-kicker">
        {{ article.categoria }}<template v-if="article.seccion"> · {{ article.seccion }}</template>
      </span>
      <h3 class="news-title-serif nac__title">{{ article.title }}</h3>
      <p
        v-if="
          variant !== 'compact' &&
          variant !== 'overlayCompact' &&
          variant !== 'overlay'
        "
        class="nac__desc"
      >
        {{ article.description }}
      </p>
      <p class="nac__meta">
        <span v-if="article.autorImagen && autorAvatarSrc" class="nac__autor-avatar">
          <img
            :src="autorAvatarSrc"
            alt=""
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="nac__meta-line">{{ article.autor }} · {{ formatearFechaCorta(article.fecha) }}</span>
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.nac {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-bottom: 1px solid var(--news-border);
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
}

.nac:hover .nac__title {
  color: var(--news-red);
}

.nac__media {
  overflow: hidden;
  border-radius: 2px;
  margin-bottom: 0.65rem;
}

.nac--imagen-redondeada .nac__media {
  border-radius: 12px;
}

.nac__media img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.nac--compact {
  flex-direction: row;
  gap: 0.75rem;
  align-items: flex-start;
}

.nac--compact .nac__media {
  flex: 0 0 120px;
  margin-bottom: 0;
}

.nac--compact .nac__media img {
  aspect-ratio: 4 / 3;
}

.nac--large .nac__title {
  font-size: 1.35rem;
}

.nac--medium .nac__title {
  font-size: 1.05rem;
}

.nac--compact .nac__title {
  font-size: 0.95rem;
}

.nac__desc {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: var(--news-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nac__meta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  color: var(--news-muted);
}

.nac__autor-avatar {
  flex-shrink: 0;
  line-height: 0;
}

.nac__autor-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
}

.nac__meta-line {
  min-width: 0;
}

/* Portada hero «triada»: tarjeta imagen completa + texto sobre degradado */
.nac--overlay,
.nac--overlayCompact {
  position: relative;
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
  min-height: 220px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.nac--overlay {
  min-height: 280px;
}

@media (min-width: 900px) {
  .nac--overlay {
    min-height: 0;
    height: 100%;
  }

  .nac--overlayCompact {
    min-height: 0;
    height: 100%;
  }
}

.nac--overlay::after,
.nac--overlayCompact::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(0, 21, 41, 0.88) 0%,
    rgba(0, 21, 41, 0.35) 45%,
    transparent 100%
  );
  border-radius: inherit;
}

.nac--overlay .nac__media--overlay,
.nac--overlayCompact .nac__media--overlay {
  position: absolute;
  inset: 0;
  margin: 0;
  border-radius: 0;
}

.nac--overlay .nac__media--overlay img,
.nac--overlayCompact .nac__media--overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: unset;
}

.nac__media--placeholder {
  background: linear-gradient(145deg, var(--color-secondary-soft) 0%, var(--color-secondary) 100%);
}

.nac--overlay .nac__body,
.nac--overlayCompact .nac__body {
  position: relative;
  z-index: 2;
  padding: 1rem 1.15rem 1.1rem;
  margin: 0;
}

.nac--overlay .nac__title,
.nac--overlayCompact .nac__title {
  font-family: var(--news-sans);
  font-weight: 800;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.nac--overlay .nac__title {
  font-size: clamp(1.15rem, 2.8vw, 1.65rem);
  line-height: 1.2;
}

.nac--overlayCompact .nac__title {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  line-height: 1.25;
}

.nac--overlay .news-kicker {
  color: var(--color-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.nac--overlayCompact .news-kicker,
.nac--overlayCompact .nac__desc,
.nac--overlayCompact .nac__meta {
  display: none;
}

.nac--overlay .nac__meta {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.65rem;
}

.nac--overlay .nac__autor-avatar img {
  border: 2px solid rgba(255, 255, 255, 0.35);
}

.nac--overlay:hover .nac__title,
.nac--overlayCompact:hover .nac__title {
  color: var(--color-primary);
}

.nac--overlayCompact {
  min-height: 160px;
}
</style>
