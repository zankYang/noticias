export const CATEGORIAS = [
  'Nacional',
  'Mundo',
  'Economía',
  'Deportes',
  'Espectáculos',
  'Tecnología',
  'Opinión'
] as const

export type Categoria = (typeof CATEGORIAS)[number]

/** Carpeta bajo `content/articulos/<carpeta>/` (sin acentos, estable en el repo). */
export const CARPETA_POR_CATEGORIA = {
  Nacional: 'nacional',
  Mundo: 'mundo',
  Economía: 'economia',
  Deportes: 'deportes',
  Espectáculos: 'espectaculos',
  Tecnología: 'tecnologia',
  Opinión: 'opinion'
} as const satisfies Record<Categoria, string>
