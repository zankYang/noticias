<script setup lang="ts">
/**
 * Ruta de vista para la config en content/sitio/portada.yml (colección tipo `data`: no genera URL sola).
 */
definePageMeta({
  layout: 'default'
})

const { sitio } = await useSitioPortadaResuelto()

useSeoMeta({
  title: () => `Configuración del sitio · ${sitio.value.nombreSitio}`,
  description: () => sitio.value.seoDescripcion,
  robots: 'noindex, nofollow'
})
</script>

<template>
  <article class="cfg news-container">
    <header class="cfg__head">
      <p class="news-kicker">content/sitio/portada.yml</p>
      <h1 class="news-title-serif cfg__title">Configuración general del sitio</h1>
      <p class="cfg__lead">
        Estos valores alimentan la cabecera, el pie y la portada. Edítalos en el IDE o en
        <NuxtLink to="/_studio" target="_blank" rel="noopener">Nuxt Studio</NuxtLink>.
      </p>
    </header>

    <section class="cfg__block">
      <h2 class="cfg__h2">Identidad y SEO</h2>
      <dl class="cfg__dl">
        <dt>Nombre del sitio</dt>
        <dd>{{ sitio.nombreSitio }}</dd>
        <dt>Tagline (barra superior)</dt>
        <dd>{{ sitio.taglineBar }}</dd>
        <dt>Título SEO (portada)</dt>
        <dd>{{ sitio.seoTitulo }}</dd>
        <dt>Descripción SEO</dt>
        <dd>{{ sitio.seoDescripcion }}</dd>
        <dt>Pie de página</dt>
        <dd>{{ sitio.piePagina || '—' }}</dd>
        <dt>Enlace a Studio</dt>
        <dd>{{ sitio.mostrarEnlaceStudio ? 'Visible' : 'Oculto' }}</dd>
        <dt>Diseño · ancho del contenido</dt>
        <dd>{{ sitio.diseno.anchoContenido }}</dd>
      </dl>
    </section>

    <section class="cfg__block">
      <h2 class="cfg__h2">Menú y categorías en portada</h2>
      <p class="cfg__tags">{{ sitio.categoriasNav.join(' · ') }}</p>
    </section>

    <section class="cfg__block">
      <h2 class="cfg__h2">Bloques de la portada</h2>
      <dl class="cfg__dl">
        <dt>Hero</dt>
        <dd>{{ sitio.portada.mostrarHero ? 'Sí' : 'No' }}</dd>
        <dt>Título “últimas”</dt>
        <dd>{{ sitio.portada.tituloUltimasNoticias }}</dd>
        <dt>Límite últimas noticias</dt>
        <dd>{{ sitio.portada.limiteUltimas }}</dd>
        <dt>Secciones por categoría</dt>
        <dd>{{ sitio.portada.mostrarSeccionesCategoria ? 'Sí' : 'No' }}</dd>
        <dt>Artículos por sección</dt>
        <dd>{{ sitio.portada.articulosPorSeccion }}</dd>
        <dt>Barra lateral</dt>
        <dd>{{ sitio.portada.mostrarSidebar ? 'Sí' : 'No' }}</dd>
        <dt>Sidebar · posición</dt>
        <dd>{{ sitio.portada.sidebar.posicion }}</dd>
        <dt>Sidebar · ancho</dt>
        <dd>{{ sitio.portada.sidebar.ancho }}</dd>
        <dt>Sidebar · variante visual</dt>
        <dd>{{ sitio.portada.sidebar.variante }}</dd>
        <dt>Título sidebar</dt>
        <dd>{{ sitio.portada.tituloSidebar }}</dd>
        <dt>Límite sidebar</dt>
        <dd>{{ sitio.portada.limiteSidebar }}</dd>
        <dt>Hero · título (opcional)</dt>
        <dd>{{ sitio.portada.hero.titulo || '—' }}</dd>
        <dt>Hero · subtítulo</dt>
        <dd>{{ sitio.portada.hero.subtitulo || '—' }}</dd>
        <dt>Hero · variante</dt>
        <dd>{{ sitio.portada.hero.variante }}</dd>
        <dt>Hero · límite secundarias</dt>
        <dd>{{ sitio.portada.hero.limiteSecundarias }}</dd>
        <dt>Hero · artículo principal (ruta)</dt>
        <dd>{{ sitio.portada.hero.principalPath || '— (automático: enPortada + fecha)' }}</dd>
        <dt>Hero · secundarias fijas</dt>
        <dd>
          <template v-if="sitio.portada.hero.secundariosPaths?.length">
            <ul class="cfg__list">
              <li v-for="(p, i) in sitio.portada.hero.secundariosPaths" :key="i">{{ p }}</li>
            </ul>
          </template>
          <template v-else>— (automático)</template>
        </dd>
      </dl>
    </section>

    <p class="cfg__nav">
      <NuxtLink to="/">← Ir a la portada</NuxtLink>
    </p>
  </article>
</template>

<style scoped>
.cfg {
  max-width: 44rem;
  padding-block: 2rem 3rem;
}

.cfg__title {
  font-size: 1.75rem;
  margin: 0.25rem 0 0.75rem;
}

.cfg__lead {
  margin: 0;
  color: var(--news-muted);
  line-height: 1.5;
}

.cfg__lead :deep(a) {
  font-weight: 600;
}

.cfg__block {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--news-border);
}

.cfg__h2 {
  font-family: var(--news-serif);
  font-size: 1.15rem;
  margin: 0 0 1rem;
}

.cfg__dl {
  margin: 0;
  display: grid;
  gap: 0.5rem 1.5rem;
  grid-template-columns: minmax(8rem, 11rem) 1fr;
}

.cfg__dl dt {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--news-muted);
}

.cfg__dl dd {
  margin: 0;
  font-size: 0.95rem;
}

.cfg__tags {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.cfg__nav {
  margin-top: 2.5rem;
  font-weight: 600;
}

.cfg__list {
  margin: 0;
  padding-left: 1.15rem;
}

.cfg__list li {
  margin: 0.15rem 0;
}
</style>
