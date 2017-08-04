//import 'es6-promise/auto'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import VueAnalytics from 'vue-analytics'
import App from '@/App.vue'
import metaMixin from '@/components/mixins/meta'
import { createStore } from '@/store'
import { createRouter } from '@/router'
import { sync } from 'vuex-router-sync'
import messages from '@/translations'

Vue.config.productionTip = false

if (typeof window !== 'undefined') {
  Raven.config('https://c797f4afa8e347a1a886a7d994aa1372@sentry.io/199080')
  .addPlugin(RavenVue, Vue)
  .install()
}

// mixin for handling title and meta description
Vue.mixin(metaMixin)

// Create VueI18n instance with options
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // Google Analytics
  if (process.BROWSER_BUILD) {
    const id = 'UA-97185138-1'
    Vue.use(VueAnalytics, { id, router })
  }

  /* eslint-disable no-new */
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
