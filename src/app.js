//import 'es6-promise/auto'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueAnalytics from 'vue-analytics'
import App from '@/App.vue'
import { createStore } from '@/store'
import { createRouter } from '@/router'
import { sync } from 'vuex-router-sync'
import messages from '@/translations'

Vue.config.productionTip = false

Vue.use(VueI18n)

// Create VueI18n instance with options
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

  // Set page title to route title
/*
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })
*/

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
