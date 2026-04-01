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
        <dt>Diseño · ancho del contenido</dt>
        <dd>{{ sitio.diseno.anchoContenido }}</dd>
      </dl>
    </section>

    <section class="cfg__block">
      <h2 class="cfg__h2">Menú por categorías</h2>
      <p class="cfg__lead">
        Las entradas del menú superior se generan desde las carpetas de los artículos en
        <code>content/articulos/</code>. Si aún no hay artículos, se muestra el listado por defecto del
        código (<code>categorias.ts</code>).
      </p>
    </section>

    <section class="cfg__block">
      <h2 class="cfg__h2">Bloques de la portada</h2>
      <dl class="cfg__dl">
        <dt>Banner (encima del hero)</dt>
        <dd>
          <template v-if="sitio.portada.banner?.imagen">
            <code>{{ sitio.portada.banner.imagen }}</code>
            <template v-if="sitio.portada.banner.alt"> — alt: {{ sitio.portada.banner.alt }}</template>
            <template v-if="sitio.portada.banner.enlace">
              — enlace: {{ sitio.portada.banner.enlace }}
            </template>
          </template>
          <template v-else>— (sin banner)</template>
        </dd>
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
        <dt>Secciones · variante de rejilla</dt>
        <dd>{{ sitio.portada.secciones.varianteGrid }}</dd>
        <dt>Secciones · columnas escritorio (forzado)</dt>
        <dd>{{ sitio.portada.secciones.columnasEscritorio ?? '— (automático por variante)' }}</dd>
        <dt>Secciones · prefijo / sufijo de título</dt>
        <dd>
 «{{ sitio.portada.secciones.tituloPrefijo }}» … «{{ sitio.portada.secciones.tituloSufijo }}»
        </dd>
        <dt>Secciones · variante de tarjeta</dt>
        <dd>{{ sitio.portada.secciones.varianteTarjeta }}</dd>
        <dt>Secciones · orden categorías</dt>
        <dd>
          <template v-if="sitio.portada.secciones.ordenCategorias?.length">
            {{ sitio.portada.secciones.ordenCategorias.join(' → ') }}
          </template>
          <template v-else>— (igual que el menú)</template>
        </dd>
        <dt>Secciones · mostrar título / borde</dt>
        <dd>
          {{ sitio.portada.secciones.mostrarTitulo ? 'Título sí' : 'Título no' }} ·
          {{ sitio.portada.secciones.mostrarBordeTitulo ? 'Borde sí' : 'Borde no' }}
        </dd>
        <dt>Secciones · espaciado</dt>
        <dd>{{ sitio.portada.secciones.espaciado }}</dd>
        <dt>Secciones · items (override)</dt>
        <dd>
          <template v-if="sitio.portada.secciones.items.length">
            <ul class="cfg__list cfg__list--dense">
              <li v-for="it in sitio.portada.secciones.items" :key="it.categoria">
                <strong>{{ it.categoria }}</strong>
                <template v-if="it.titulo"> · título: {{ it.titulo }}</template>
                <template v-if="it.limite != null"> · límite: {{ it.limite }}</template>
                <template v-if="it.oculta"> · oculta</template>
                <template v-if="it.varianteGrid"> · rejilla: {{ it.varianteGrid }}</template>
                <template v-if="it.columnasEscritorio"> · cols: {{ it.columnasEscritorio }}</template>
              </li>
            </ul>
          </template>
          <template v-else>—</template>
        </dd>
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
        <template v-if="sitio.portada.hero.variante === 'ajustado'">
          <dt>Hero · ajustado · columna principal (<code>fr</code>)</dt>
          <dd>
            {{
              sitio.portada.hero.ajustadoColumnaPrincipal ??
              '1 (predeterminado si no se define)'
            }}
          </dd>
          <dt>Hero · ajustado · columnas secundarias (<code>fr</code>)</dt>
          <dd>
            {{
              sitio.portada.hero.ajustadoColumnaSecundarias ??
              '1 (predeterminado si no se define)'
            }}
          </dd>
          <dt>Hero · ajustado · separación (rem)</dt>
          <dd>
            {{
              sitio.portada.hero.ajustadoSeparacionRem ??
              '— (hueco por defecto del grid: 1.25rem)'
            }}
          </dd>
        </template>
        <dt>Hero · límite secundarias</dt>
        <dd>{{ sitio.portada.hero.limiteSecundarias }}</dd>
        <dt>Hero · artículo principal (<code>identificadorPortada</code>)</dt>
        <dd>
          {{
            sitio.portada.hero.principalIdentificador ||
            '— (automático: enPortada + fecha)'
          }}
        </dd>
        <dt>Hero · secundarias fijas (identificadores)</dt>
        <dd>
          <template v-if="sitio.portada.hero.secundariosIdentificadores?.length">
            <ul class="cfg__list">
              <li
                v-for="(p, i) in sitio.portada.hero.secundariosIdentificadores"
                :key="i"
              >
                {{ p }}
              </li>
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
