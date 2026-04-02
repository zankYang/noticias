<script setup lang="ts">
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

const props = defineProps<{
  nombre: string
  cargo?: string
  imagen?: string
  organizacion?: string
}>()

const config = useRuntimeConfig()

const imgSrc = computed(() =>
  props.imagen
    ? cloudinaryDeliveryUrl(props.imagen, {
        cloudName: config.public.cloudinaryCloudName as string,
        width: 120,
        height: 120,
        crop: 'fill',
        gravity: 'face'
      })
    : ''
)
</script>

<template>
  <aside class="perfil-persona">
    <div v-if="imgSrc" class="perfil-persona__avatar">
      <img :src="imgSrc" :alt="props.nombre" width="80" height="80" loading="lazy" />
    </div>
    <div class="perfil-persona__info">
      <p class="perfil-persona__nombre">{{ props.nombre }}</p>
      <p v-if="props.cargo" class="perfil-persona__cargo">
        {{ props.cargo }}
        <span v-if="props.organizacion"> · {{ props.organizacion }}</span>
      </p>
      <div class="perfil-persona__bio">
        <slot />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.perfil-persona {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  border-radius: 8px;
}

.perfil-persona__avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.perfil-persona__nombre {
  margin: 0;
  font-weight: 700;
  font-size: 1.05rem;
}

.perfil-persona__cargo {
  margin: 0.1rem 0 0.4rem;
  font-size: 0.8rem;
  color: var(--news-muted);
}

.perfil-persona__bio {
  font-size: 0.88rem;
  line-height: 1.55;
}

.perfil-persona__bio :deep(p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 480px) {
  .perfil-persona {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
