import Vue from 'vue'
import 'es6-promise/auto'
import jQuery from 'jquery'
import { createApp } from './app'
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        app: this,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})
const { app, router, store } = createApp()
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    Promise.all(asyncDataHooks.map(hook => hook({ app, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })
  // Google analytics for router
  router.beforeEach(function (to, from, next) {
    app.$ga.event({
      eventCategory: 'router',
      eventAction: 'click',
      eventLabel: 'Router link click',
      eventValue: {
        from: from.path,
        to: to.path
      }
    })
    next()
  })
  // actually mount to DOM
  app.$mount('#app')
})
// Google analytics for email anf phones links
jQuery(document).on('click', 'a[href^="mailto:"]', function () {
  app.$ga.event({
    eventCategory: 'Email link',
    eventAction: 'click',
    eventLabel: 'Email link click',
    eventValue: jQuery(this).attr('href').substr(7)
  })
})
jQuery(document).on('click', 'a[href^="tel:"]', function () {
  app.$ga.event({
    eventCategory: 'Phone link',
    eventAction: 'click',
    eventLabel: 'Phone link click',
    eventValue: jQuery(this).attr('href').substr(4)
  })
})
// service worker
// if ('https:' === location.protocol && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }