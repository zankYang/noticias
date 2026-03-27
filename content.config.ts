import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { CATEGORIAS } from './categorias'

const categoriaZ = z.enum(
  CATEGORIAS as unknown as [typeof CATEGORIAS[number], ...typeof CATEGORIAS[number][]]
)

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
  sidebar: sidebarPortadaSchema.optional()
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
