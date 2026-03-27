import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { OPCIONES_CATEGORIA_STUDIO } from './categorias.opciones.generated'

/** Select en Studio: valores generados desde carpetas en `content/articulos/` (`pnpm sync:categorias`). */
const OPCIONES_CATEGORIA_TUPLE = OPCIONES_CATEGORIA_STUDIO as unknown as [
  string,
  ...string[]
]

const categoriaZ = z.enum(OPCIONES_CATEGORIA_TUPLE)

const variantesHero = [
  'rejilla',
  'apilado',
  'soloPrincipal',
  'invertida',
  'mosaico',
  'cinta',
  'editorial'
] as const

const heroPortadaSchema = z.object({
  titulo: z.string().optional(),
  subtitulo: z.string().optional(),
  limiteSecundarias: z.number().int().min(0).max(8).default(3),
  variante: z.enum(variantesHero).default('rejilla'),
  /** Ruta del artículo principal, ej. /articulos/nacional/mi-nota (si falta o no existe, se usa `enPortada` + fecha). */
  principalPath: z.string().optional(),
  /** Orden fijo de notas secundarias (misma convención de ruta); se rellenan con automático si faltan cupos. */
  secundariosPaths: z.array(z.string()).max(8).optional()
})

const sidebarPortadaSchema = z.object({
  /** Columna lateral a la derecha (por defecto) o a la izquierda del contenido principal. */
  posicion: z.enum(['derecha', 'izquierda']).default('derecha'),
  /** Ancho de la columna lateral en escritorio. */
  ancho: z.enum(['estrecho', 'normal', 'amplio']).default('normal'),
  /** Estilo visual del bloque “Lo más leído” y análogos. */
  variante: z.enum(['numerada', 'tarjetas', 'minimal']).default('numerada')
})

const variantesGridSeccion = ['clasica', 'densa', 'lista', 'destacado'] as const
const columnasSeccionZ = z.union([z.literal(2), z.literal(3), z.literal(4)])

const seccionItemOverrideSchema = z.object({
  categoria: categoriaZ,
  titulo: z.string().optional(),
  limite: z.number().int().min(0).max(24).optional(),
  oculta: z.boolean().optional(),
  varianteGrid: z.enum(variantesGridSeccion).optional(),
  columnasEscritorio: columnasSeccionZ.optional()
})

const seccionesPortadaSchema = z.object({
  varianteGrid: z.enum(variantesGridSeccion).default('clasica'),
  /** Si se define (2–4), fuerza columnas en escritorio; si no, depende de varianteGrid. */
  columnasEscritorio: columnasSeccionZ.optional(),
  tituloPrefijo: z.string().default(''),
  tituloSufijo: z.string().default(''),
  /** Orden de bloques; se cruza con categoriasNav (las que no aparezcan van después). */
  ordenCategorias: z.array(categoriaZ).optional(),
  varianteTarjeta: z.enum(['medium', 'compact']).default('medium'),
  mostrarTitulo: z.boolean().default(true),
  mostrarBordeTitulo: z.boolean().default(true),
  espaciado: z.enum(['normal', 'amplio', 'compacto']).default('normal'),
  items: z.array(seccionItemOverrideSchema).optional()
})

const portadaBloque = z.object({
  mostrarHero: z.boolean().default(true),
  tituloUltimasNoticias: z.string().default('Últimas noticias'),
  limiteUltimas: z.number().default(8),
  mostrarSeccionesCategoria: z.boolean().default(true),
  articulosPorSeccion: z.number().default(4),
  mostrarSidebar: z.boolean().default(true),
  tituloSidebar: z.string().default('Lo más leído'),
  limiteSidebar: z.number().default(5),
  hero: heroPortadaSchema.optional(),
  sidebar: sidebarPortadaSchema.optional(),
  secciones: seccionesPortadaSchema.optional()
})

const disenoSitioSchema = z.object({
  /** Ancho máximo de `.news-container` en todo el sitio. */
  anchoContenido: z.enum(['estrecho', 'normal', 'amplio', 'maximo']).default('normal')
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        // MD + YAML fuera de `articulos/` y `sitio/` (Studio a veces crea .yml al navegar carpetas).
        // `sitio/**` y `articulos/**` tienen colección propia para no duplicar entradas.
        include: '**/*.{md,yml}',
        exclude: ['articulos/**', 'sitio/**']
      }
    }),
    /**
     * YAML opcional dentro de `content/articulos/**` (p. ej. notas de carpeta que crea Studio).
     * Las notas publicadas siguen siendo `.md` en la colección `articulos`.
     */
    articulosMeta: defineCollection({
      type: 'data',
      source: 'articulos/**/*.yml',
      schema: z
        .object({
          titulo: z.string().optional(),
          nota: z.string().optional()
        })
        .passthrough()
    }),
    articulos: defineCollection({
      type: 'page',
      // Incluye subcarpetas: p. ej. content/articulos/nacional/mi-nota.md
      source: 'articulos/**/*.md',
      schema: z.object({
        fecha: z.string(),
        categoria: categoriaZ,
        /** Subsección editorial opcional (CDMX, Estados, etc.); no cambia la URL. */
        seccion: z.string().optional(),
        autor: z.string(),
        imagen: z.string().optional(),
        destacada: z.boolean().default(false),
        enPortada: z.boolean().default(false),
        orden: z.number().optional()
      }),
      indexes: [
        { columns: ['categoria'] },
        { columns: ['fecha'] },
        { columns: ['enPortada'] },
        { columns: ['destacada'] }
      ]
    }),
    sitio: defineCollection({
      type: 'data',
      source: 'sitio/**/*.yml',
      schema: z.object({
        nombreSitio: z.string(),
        taglineBar: z.string().default('Últimas noticias'),
        mostrarEnlaceStudio: z.boolean().default(true),
        piePagina: z.string().optional(),
        seoTitulo: z.string(),
        seoDescripcion: z.string(),
        categoriasNav: z.array(categoriaZ).optional(),
        diseno: disenoSitioSchema.optional(),
        portada: portadaBloque
      })
    })
  }
})
