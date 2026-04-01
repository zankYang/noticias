<script setup lang="ts">
import { computed } from 'vue'
import type { ArticulosCollectionItem } from '@nuxt/content'
import type { VarianteHero } from '~/composables/useSitioPortada'

const props = withDefaults(
  defineProps<{
    main: ArticulosCollectionItem | null
    side: ArticulosCollectionItem[]
    titulo?: string
    subtitulo?: string
    variante?: VarianteHero
    /** Variante `ajustado`: factor `fr` de la columna principal (p. ej. 1.65 ≈ 62 % del total). */
    ajustadoColumnaPrincipal?: number
    /** Variante `ajustado`: factor `fr` de la columna de secundarias. */
    ajustadoColumnaSecundarias?: number
    /** Variante `ajustado`: separación entre columnas en rem. */
    ajustadoSeparacionRem?: number
  }>(),
  { variante: 'rejilla' }
)

/** Variante `ajustado`: proporciones (`fr`) y hueco vía CSS vars; columnas dobles solo desde 900px en el bloque scoped. */
const ajustadoCssVars = computed((): Record<string, string> | undefined => {
  if (props.variante !== 'ajustado') return undefined
  const g = props.ajustadoSeparacionRem
  const o: Record<string, string> = {}
  if (!props.side?.length) {
    o['--hero-ajustado-cols'] = '1fr'
  } else {
    const p = props.ajustadoColumnaPrincipal ?? 1
    const s = props.ajustadoColumnaSecundarias ?? 1
    o['--hero-ajustado-cols'] = `${p}fr ${s}fr`
  }
  if (g != null && Number.isFinite(g) && g >= 0) {
    o['--hero-ajustado-gap'] = `${g}rem`
  }
  return o
})

/** Reparto de secundarias para la variante `laterales`: mitad a cada lateral. */
const lateralIzquierda = computed(() => {
  const s = props.side
  if (!s.length) return []
  const mid = Math.ceil(s.length / 2)
  return s.slice(0, mid)
})

const lateralDerecha = computed(() => {
  const s = props.side
  if (!s.length) return []
  const mid = Math.ceil(s.length / 2)
  return s.slice(mid)
})

const lateralesLayoutClass = computed(() => {
  const li = lateralIzquierda.value.length
  const ld = lateralDerecha.value.length
  if (li && ld) return 'hero__laterales--tres'
  if (li && !ld) return 'hero__laterales--izq-centro'
  if (!li && ld) return 'hero__laterales--centro-der'
  return 'hero__laterales--solo-centro'
})
</script>

<template>
  <section
    v-if="main"
    class="hero news-container"
    :class="`hero--${variante ?? 'rejilla'}`"
  >
    <header v-if="titulo || subtitulo" class="hero__head">
      <h2 v-if="titulo" class="hero__title news-title-serif">{{ titulo }}</h2>
      <p v-if="subtitulo" class="hero__sub">{{ subtitulo }}</p>
    </header>

    <template v-if="variante === 'laterales'">
      <div class="hero__laterales" :class="lateralesLayoutClass">
        <aside
          v-if="lateralIzquierda.length"
          class="hero__lateral hero__lateral--izq"
          aria-label="Noticias — lateral izquierda"
        >
          <NewsArticleCard
            v-for="item in lateralIzquierda"
            :key="item.id"
            :article="item"
            variant="compact"
          />
        </aside>
        <div class="hero__centro">
          <NewsArticleCard :article="main" variant="large" />
        </div>
        <aside
          v-if="lateralDerecha.length"
          class="hero__lateral hero__lateral--der"
          aria-label="Noticias — lateral derecha"
        >
          <NewsArticleCard
            v-for="item in lateralDerecha"
            :key="item.id"
            :article="item"
            variant="compact"
          />
        </aside>
      </div>
    </template>

    <template v-else-if="variante === 'editorial'">
      <div class="hero__editorial-main">
        <NewsArticleCard :article="main" variant="large" />
      </div>
      <div v-if="side.length" class="hero__editorial-row">
        <NewsArticleCard
          v-for="item in side"
          :key="item.id"
          :article="item"
          variant="medium"
        />
      </div>
    </template>

    <div
      v-else-if="variante === 'triada'"
      class="hero__triada"
      :class="{
        'hero__triada--solo': !side.length,
        'hero__triada--una-sec': side.length === 1
      }"
    >
      <NewsArticleCard
        :article="main"
        variant="overlay"
        class="hero__triada-main"
      />
      <NewsArticleCard
        v-for="(item, i) in side.slice(0, 2)"
        :key="item.id"
        :article="item"
        variant="overlayCompact"
        :class="['hero__triada-side', `hero__triada-side--${i}`]"
      />
    </div>

    <div v-else class="hero__grid" :style="ajustadoCssVars">
      <NewsArticleCard :article="main" variant="large" class="hero__main" />
      <div v-if="side.length && variante !== 'soloPrincipal'" class="hero__side">
        <NewsArticleCard
          v-for="item in side"
          :key="item.id"
          :article="item"
          :variant="variante === 'mosaico' ? 'medium' : 'compact'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 1.25rem;
}

.hero__head {
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  margin: 0 0 0.35rem;
}

.hero__sub {
  margin: 0;
  color: var(--news-muted);
  font-size: 0.95rem;
  line-height: 1.45;
  max-width: 40rem;
}

.hero__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .hero--rejilla .hero__grid {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }

  .hero--invertida .hero__grid {
    grid-template-columns: 1fr 1.4fr;
    align-items: start;
  }

  .hero--invertida .hero__main {
    order: 2;
  }

  .hero--invertida .hero__side {
    order: 1;
  }

  .hero--ajustado .hero__grid {
    align-items: start;
    grid-template-columns: var(--hero-ajustado-cols, 1fr 1fr);
    gap: var(--hero-ajustado-gap, 1.25rem);
  }

  .hero--mosaico .hero__grid {
    grid-template-columns: 1.35fr 1fr;
    grid-template-rows: auto auto;
    align-items: stretch;
  }

  .hero--mosaico .hero__main {
    grid-row: 1 / -1;
  }

  .hero--mosaico .hero__side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    align-content: start;
  }
}

.hero__side {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hero--apilado .hero__side {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
}

@media (min-width: 640px) {
  .hero--apilado .hero__side {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .hero--apilado .hero__side {
    grid-template-columns: repeat(3, 1fr);
  }
}

.hero--soloPrincipal .hero__grid {
  grid-template-columns: 1fr;
}

.hero--cinta .hero__grid {
  grid-template-columns: 1fr;
}

.hero--cinta .hero__side {
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.85rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  margin-inline: -0.25rem;
  padding-inline: 0.25rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.hero--cinta .hero__side :deep(.nac) {
  flex: 0 0 min(272px, 78vw);
  scroll-snap-align: start;
  margin-bottom: 0;
}

.hero__editorial-main {
  margin-bottom: 1rem;
}

.hero__editorial-row {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .hero__editorial-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .hero__editorial-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Laterales: columnas izq / centro amplio / der (como portales de noticias) */
.hero__laterales {
  display: grid;
  gap: 1rem 1.25rem;
  align-items: start;
}

.hero__lateral {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.hero__lateral :deep(.nac--compact) {
  padding-bottom: 0.65rem;
  margin-bottom: 0.35rem;
}

.hero__centro {
  min-width: 0;
}

@media (min-width: 900px) {
  .hero--laterales .hero__laterales--tres {
    grid-template-columns: minmax(200px, 1fr) minmax(0, 2fr) minmax(200px, 1fr);
  }

  .hero--laterales .hero__laterales--izq-centro {
    grid-template-columns: minmax(200px, 0.92fr) minmax(0, 1.08fr);
  }

  .hero--laterales .hero__laterales--centro-der {
    grid-template-columns: minmax(0, 1.08fr) minmax(200px, 0.92fr);
  }

  .hero--laterales .hero__laterales--solo-centro {
    grid-template-columns: 1fr;
    max-width: 48rem;
    margin-inline: auto;
  }

  .hero--laterales .hero__laterales--tres .hero__centro {
    border-left: 1px solid var(--news-border);
    border-right: 1px solid var(--news-border);
    padding-inline: 1.15rem;
  }

  .hero--laterales .hero__laterales--izq-centro .hero__centro {
    border-left: 1px solid var(--news-border);
    padding-left: 1.15rem;
  }

  .hero--laterales .hero__laterales--centro-der .hero__centro {
    border-right: 1px solid var(--news-border);
    padding-right: 1.15rem;
  }
}

@media (max-width: 899px) {
  .hero--laterales .hero__laterales {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .hero--laterales .hero__centro {
    order: -1;
  }

  .hero--laterales .hero__lateral--izq {
    border-top: 1px solid var(--news-border);
    padding-top: 0.75rem;
  }

  .hero--laterales .hero__lateral--der {
    border-top: 1px solid var(--news-border);
    padding-top: 0.75rem;
  }
}

/* Triada: columna principal + dos apiladas (titular sobre imagen + degradado) */
.hero__triada {
  display: grid;
  gap: 1rem;
  min-height: 0;
}

@media (max-width: 899px) {
  .hero__triada {
    grid-template-columns: 1fr;
  }

  .hero__triada-main {
    order: 0;
  }

  .hero__triada-side {
    order: 1;
  }
}

@media (min-width: 900px) {
  .hero__triada {
    grid-template-columns: 1.55fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: stretch;
    min-height: min(52vw, 440px);
    max-height: 480px;
  }

  .hero__triada--solo {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    max-height: none;
  }

  .hero__triada--solo .hero__triada-main {
    grid-column: 1;
    grid-row: 1;
    max-height: 420px;
  }

  .hero__triada-main {
    grid-column: 1;
    grid-row: 1 / -1;
    min-height: 0;
  }

  .hero__triada-side--0 {
    grid-column: 2;
    grid-row: 1;
    min-height: 0;
  }

  .hero__triada-side--1 {
    grid-column: 2;
    grid-row: 2;
    min-height: 0;
  }

  .hero__triada--una-sec .hero__triada-side--0 {
    grid-row: 1 / -1;
  }
}
</style>
