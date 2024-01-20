// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  runtimeConfig: {
    public: {
      cdnBase: "https://edge.cdn.emk.dev",
    },
  },
});
