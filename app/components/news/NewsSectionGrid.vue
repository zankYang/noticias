<script setup lang="ts">
import type { ArticulosCollectionItem } from '@nuxt/content'
import type { EspaciadoSecciones, VarianteGridSecciones } from '~/composables/useSitioPortada'

const props = withDefaults(
  defineProps<{
    id: string
    titulo: string
    articulos: ArticulosCollectionItem[]
    varianteGrid: VarianteGridSecciones
    /** Columnas en viewport ancho (1–4). */
    columnasEscritorio: number
    varianteTarjeta: 'medium' | 'compact'
    mostrarTitulo?: boolean
    mostrarBordeTitulo?: boolean
    espaciado?: EspaciadoSecciones
  }>(),
  {
    mostrarTitulo: true,
    mostrarBordeTitulo: true,
    espaciado: 'normal'
  }
)

const restoDestacado = computed(() =>
  props.varianteGrid === 'destacado' ? props.articulos.slice(1) : props.articulos
)
</script>

<template>
  <section
    v-if="articulos.length"
    :id="id"
    class="sec news-container"
    :class="[`sec--${varianteGrid}`, `sec--esp-${espaciado}`]"
    :style="{ '--sec-cols-desktop': columnasEscritorio }"
  >
    <h2
      v-if="mostrarTitulo"
      class="news-title-serif sec__title"
      :class="{ 'sec__title--plain': !mostrarBordeTitulo }"
    >
      {{ titulo }}
    </h2>

    <div class="sec__grid">
      <template v-if="varianteGrid === 'destacado'">
        <NewsArticleCard
          :article="articulos[0]"
          variant="large"
          class="sec__destacado-principal"
        />
        <NewsArticleCard
          v-for="a in restoDestacado"
          :key="a.id"
          :article="a"
          variant="medium"
        />
      </template>
      <template v-else>
        <NewsArticleCard
          v-for="a in articulos"
          :key="a.id"
          :article="a"
          :variant="varianteTarjeta"
        />
      </template>
    </div>
  </section>
</template>

<style scoped>
.sec {
  scroll-margin-top: 6rem;
}

.sec--esp-normal {
  padding-block: 1.5rem;
}

.sec--esp-amplio {
  padding-block: 2.25rem;
}

.sec--esp-compacto {
  padding-block: 1rem;
}

.sec__title {
  font-size: 1.35rem;
  padding-bottom: 0.5rem;
  margin: 0 0 1rem;
  border-bottom: 2px solid var(--news-red);
}

.sec__title--plain {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0.75rem;
}

.sec__grid {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
}

.sec--lista .sec__grid {
  gap: 0.35rem;
}

@media (min-width: 640px) {
  .sec__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sec--lista .sec__grid {
    grid-template-columns: 1fr;
  }

  .sec--destacado .sec__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sec--destacado .sec__destacado-principal {
    grid-column: 1 / -1;
  }
}

@media (min-width: 960px) {
  .sec__grid {
    grid-template-columns: repeat(var(--sec-cols-desktop, 4), 1fr);
  }

  .sec--lista .sec__grid {
    grid-template-columns: 1fr;
  }

  .sec--destacado .sec__grid {
    grid-template-columns: repeat(var(--sec-cols-desktop, 4), 1fr);
  }

  .sec--destacado .sec__destacado-principal {
    grid-column: span 2;
    grid-row: span 1;
  }
}
</style>
