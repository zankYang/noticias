<script setup lang="ts">
const props = defineProps<{
  src: string
  titulo?: string
  duracion?: string
}>()
</script>

<template>
  <div class="audio-player">
    <div class="audio-player__info">
      <span class="audio-player__icono" aria-hidden="true">🎙️</span>
      <div>
        <p v-if="props.titulo" class="audio-player__titulo">{{ props.titulo }}</p>
        <p v-if="props.duracion" class="audio-player__duracion">Duración: {{ props.duracion }}</p>
      </div>
    </div>
    <audio controls preload="metadata" class="audio-player__control">
      <source :src="props.src" />
      Tu navegador no soporta audio HTML5.
    </audio>
  </div>
</template>

<style scoped>
.audio-player {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background: var(--news-bg);
  border: 1px solid var(--news-border);
  border-radius: 8px;
}

.audio-player__info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
}

.audio-player__icono {
  font-size: 1.4rem;
}

.audio-player__titulo {
  margin: 0;
  font-weight: 700;
  font-size: 0.9rem;
}

.audio-player__duracion {
  margin: 0;
  font-size: 0.75rem;
  color: var(--news-muted);
}

.audio-player__control {
  width: 100%;
  height: 36px;
}
</style>
