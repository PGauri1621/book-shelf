// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true }
// })

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
    devtools: { enabled: false },

  runtimeConfig: {
   googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY,
 },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },


})