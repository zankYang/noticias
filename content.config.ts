import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { CATEGORIAS } from './categorias'

const categoriaZ = z.enum(
  CATEGORIAS as unknown as [typeof CATEGORIAS[number], ...typeof CATEGORIAS[number][]]
)

const portadaBloque = z.object({
  mostrarHero: z.boolean().default(true),
  tituloUltimasNoticias: z.string().default('Últimas noticias'),
  limiteUltimas: z.number().default(8),
  mostrarSeccionesCategoria: z.boolean().default(true),
  articulosPorSeccion: z.number().default(4),
  mostrarSidebar: z.boolean().default(true),
  tituloSidebar: z.string().default('Lo más leído'),
  limiteSidebar: z.number().default(5)
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['articulos/**']
      }
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
        portada: portadaBloque
      })
    })
  }
})
