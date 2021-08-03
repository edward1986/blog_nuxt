export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'lorem ipsum dolor sit amet' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  loading: { color: '#fa923f', throttle: 0 },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  axios:  {
    baseURL: process.env.BASE_URL || "https://nuxt-cee29-default-rtdb.firebaseio.com"
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {

    baseUrl: process.env.BASE_URL || "https://nuxt-cee29-default-rtdb.firebaseio.com",
    fbAPIKey: 'AIzaSyA5e2S36YTG2YA8Jco84_QYDwDKmr6xgl4'
  },

  router:{
  },
  transition: {
    name: 'my-layouts',
    mode: 'out-in',
  }
}
