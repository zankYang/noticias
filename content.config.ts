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
  'editorial',
  /** Principal y secundarias en columnas 50/50 en escritorio. */
  'ajustado',
  /** Tres columnas: laterales (notas compactas) | centro (principal grande) | laterales. */
  'laterales',
  /** Principal alto a la izquierda y dos secundarias apiladas a la derecha; estilo imagen + titular sobre degradado. */
  'triada'
] as const

const heroPortadaSchema = z.object({
  titulo: z.string().optional(),
  subtitulo: z.string().optional(),
  limiteSecundarias: z.number().int().min(0).max(8).default(3),
  variante: z.enum(variantesHero).default('rejilla'),
  /** Identificador (`identificadorPortada` del artículo). Si falta o no coincide, se usa `enPortada` + fecha. */
  principalIdentificador: z.string().optional(),
  /** Orden fijo de secundarias por el mismo identificador; cupos vacíos se rellenan con la lógica automática. */
  secundariosIdentificadores: z.array(z.string()).max(8).optional(),
  /**
   * Variante `ajustado`: ancho relativo de la columna del artículo principal (`fr` en CSS).
   * Ej. `1.65` y secundarias `1` ≈ 62% / 38%. Por defecto 1 y 1 (= 50/50).
   */
  ajustadoColumnaPrincipal: z.coerce.number().positive().optional(),
  /** Variante `ajustado`: ancho relativo de la columna de secundarias (`fr`). */
  ajustadoColumnaSecundarias: z.coerce.number().positive().optional(),
  /** Variante `ajustado`: separación entre columnas en `rem` (0–4). */
  ajustadoSeparacionRem: z.coerce.number().min(0).max(4).optional()
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
  /** Orden de bloques; se cruza con categorías detectadas en artículos (las que no aparezcan van después). */
  ordenCategorias: z.array(categoriaZ).optional(),
  varianteTarjeta: z.enum(['medium', 'compact']).default('medium'),
  mostrarTitulo: z.boolean().default(true),
  mostrarBordeTitulo: z.boolean().default(true),
  espaciado: z.enum(['normal', 'amplio', 'compacto']).default('normal'),
  items: z.array(seccionItemOverrideSchema).optional()
})

/** Banner opcional encima del hero (Cloudinary `public_id` o URL en `imagen`). */
const portadaBannerSchema = z
  .object({
    imagen: z.string().optional(),
    alt: z.string().optional(),
    enlace: z.string().optional()
  })
  .optional()

const portadaBloque = z.object({
  /** Configuración del banner (encima del bloque hero). */
  banner: portadaBannerSchema,
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
        /** Public_id Cloudinary o URL; se muestra circular junto al nombre (g_face). */
        autorImagen: z.string().optional(),
        imagen: z.string().optional(),
        /** Cloudinary: `face` usa g_face (recorte centrado en rostro), `auto` es g_auto. */
        imagenGravedad: z.enum(['auto', 'face']).default('auto'),
        /** Bordes más redondeados en tarjetas y hero del artículo. */
        imagenRedondeada: z.boolean().default(false),
        destacada: z.boolean().default(false),
        enPortada: z.boolean().default(false),
        /**
         * Clave estable para el hero de la portada (`principalIdentificador` / `secundariosIdentificadores` en portada.yml).
         * Debe ser única entre notas que compartan el hero; si se repite, gana la primera en orden por fecha del sitio.
         */
        identificadorPortada: z.string().optional(),
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
        piePagina: z.string().optional(),
        seoTitulo: z.string(),
        seoDescripcion: z.string(),
        diseno: disenoSitioSchema.optional(),
        portada: portadaBloque
      })
    })
  }
})
