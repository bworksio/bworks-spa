import Vue from 'vue'
import Router from 'vue-router'
import routesConfig from '@/config/routes'
import config from '@/config/app.json'
import Page from '@/components/Page'
import PageBlog from '@/components/PageBlog'
import PageSubscriptionConfirmation from '@/components/PageSubscriptionConfirmation'
import PageNotFound from '@/components/PageNotFound'
const forEach = require('axios/lib/utils.js').forEach

Vue.use(Router)

// Build routes from configuration.
let routes = []
forEach(routesConfig, (languages, name) => {
  forEach(languages, (item, lang) => {
    if (config.activeLanguages.indexOf(lang) !== -1) {
      routes.push({
        name: name + '_' + lang,
        path: item.path,
        component: Page,
        props: { name, lang },
        meta: { name, title: item.title }
      })
    }
  })
})

// Add language independent routes.
routes.push({
  name: 'blog_article',
  path: '/blog/:name',
  component: PageBlog,
  props: { name: 'blog', lang: 'en' },
  meta: { name: 'blog' }
}, {
  name: 'subscription_confirmation',
  path: '/subscription-confirmation',
  component: PageSubscriptionConfirmation,
  props: { lang: 'en' }
}, {
  path: '*',
  component: PageNotFound
})

export default new Router({
  mode: 'history',
  routes,
  routesConfig,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  /**
   * Helper to look up a route by its internal / machine name.
   *
   * @param {string} name Internal route name
   * @param {string} lang Language to look up
   */
  getRouteByProps (name, lang) {
    return name in this.routesConfig ? this.routesConfig[name][lang] : false
  }
})
