// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import VueI18n from 'vue-i18n'
import VueAnalytics from 'vue-analytics'
import messages from './translations'

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages
})

// Set page title to route title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

// Google Analytics
const id = 'UA-97185138-1'
Vue.use(VueAnalytics, { id, router })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
