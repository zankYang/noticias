// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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