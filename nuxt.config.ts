// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
  ],
  nitro: {
    preset: 'node-server',
  },
});
