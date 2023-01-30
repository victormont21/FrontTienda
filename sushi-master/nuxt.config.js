import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // For netlify
  generate: {
    fallback: true
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CEBOLLITAS STORE",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "FUKUSUKE JAPON",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      { src: 'https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: 'logo.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@sweetalert2/theme-material-ui", "~/assets/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/cart.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "vue-sweetalert2/nuxt/no-css",
    '@nuxtjs/axios',
    "nuxt-webfontloader",
    "cookie-universal-nuxt",
  ],
  webfontloader: {
    google: {
      families: ["DM+Sans:wght@400;500;700&display=swap"],
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    defaultAssets: {
      font: {
        family: "DM Sans",
        size: 15,
      },
    },
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.deepPurple.darken1,
          bg: "#ffffff",
          surface: "#ffffff",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: colors.deepPurple.darken1,
          bg: "#0a0514",
          surface: "#130a24",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseUrl: process.env.baseUrl || 'http://localhost:8080',
  }

};
