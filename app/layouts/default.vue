<script setup lang="ts">
const { sitio } = await useSitioPortadaResuelto()
</script>

<template>
  <div class="layout">
    <NewsHeader :sitio="sitio" />
    <main class="layout__main">
      <slot />
    </main>
    <footer class="layout__footer news-container">
      <p class="layout__foot-note">
        © {{ new Date().getFullYear() }} · {{ sitio.piePagina || 'Proyecto de noticias' }}
      </p>
    </footer>
  </div>
</template>

<style scoped>
.layout__main {
  min-height: 40vh;
  padding-bottom: 2rem;
}

.layout__footer {
  border-top: 1px solid var(--news-border);
  padding-block: 1.5rem;
  margin-top: 2rem;
}

.layout__foot-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--news-muted);
}
</style>
