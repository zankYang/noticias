// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // `content` global para MDC / Nuxt Studio; `news` sigue auto-importado (no reemplazar todo `~/components`).
  components: [
    { path: '~/components/news' },
    { path: '~/components/content', global: true }
  ],
  runtimeConfig: {
    public: {
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '',
      cloudinaryAnalytics: process.env.NUXT_PUBLIC_CLOUDINARY_ANALYTICS ?? '',
      cloudinaryPublicId: process.env.NUXT_PUBLIC_CLOUDINARY_PUBLIC_ID ?? ''
    }
  },
  vite: {
    optimizeDeps: {
      include: []
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', 'nuxt-studio'],
  studio: {
    // En `pnpm dev`, Studio escribe en el disco vía Git; hace falta al menos un commit en el repo.
    route: '/_studio',
    // Requerido en `nuxt build`; sustituye por tu org/repo real o variables de entorno.
    repository: {
      provider: 'github',
      owner: 'zankYang',
      repo: 'noticias',
      branch: 'main'
    },
    meta: {
      components: {
        groups: [
          { label: 'Prosa', include: ['content/Prose**'] },
          {
            label: 'Editorial',
            include: [
              'Alerta',
              'CitaDestacada',
              'CajaInformativa',
              'DatosClave',
              'NotaRelacionada',
              'Correccion',
              'Resumen',
              'Contexto',
              'SeparadorEditorial',
              'Entradilla'
            ]
          },
          {
            label: 'Multimedia',
            include: [
              'VideoEmbed',
              'Galeria',
              'FiguraConPie',
              'AudioPlayer',
              'MapaEmbed',
              'ImagenComparativa',
              'Infografia'
            ]
          },
          {
            label: 'Interactivo',
            include: [
              'Acordeon*',
              'Pestana*',
              'Cronologia*',
              'Pregunta*',
              'Respuesta'
            ]
          },
          {
            label: 'Datos',
            include: [
              'Estadistica',
              'PerfilPersona',
              'Indicador',
              'TablaComparativa',
              'CajaAutor',
              'ContadorItem*'
            ]
          },
          {
            label: 'Estilo libre',
            include: [
              'BloqueLibre',
              'TextoEstilizado',
              'SeccionColor',
              'Columnas',
              'Columna*',
              'TextoGrande',
              'Subtitular',
              'LetraCapital',
              'EtiquetaInline'
            ]
          },
          {
            label: 'Visual',
            include: [
              'BannerHero',
              'TarjetaFlotante',
              'Glassmorphism',
              'Marquesina',
              'Spoiler',
              'Tooltip'
            ]
          },
          {
            label: 'Layout',
            include: ['Mosaico*', 'Divisor', 'Boton', 'Progreso']
          }
        ]
      }
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },
  css: ['~/assets/css/news.css'],
})