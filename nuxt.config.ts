// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', 'nuxt-studio'],
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  studio: {
    // En `pnpm dev`, Studio escribe en el disco vía Git; hace falta al menos un commit en el repo.
    route: '/_studio',
    // Requerido en `nuxt build`; sustituye por tu org/repo real o variables de entorno.
    repository: {
      provider: 'github',
      owner: process.env.STUDIO_GITHUB_OWNER || 'local',
      repo: process.env.STUDIO_GITHUB_REPO || 'proyecto-noticias',
      branch: process.env.STUDIO_GITHUB_BRANCH || 'main'
    }
  },
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },
  css: ['~/assets/css/news.css'],
  vite: {
    optimizeDeps: {
      include: []
    }
  }
})