import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from '../config/routes'
import utils from '../utils'
import Page from '../components/Page'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

// Build routes from configuration.
let routes = []
utils.forEach(routerConfig, (languages, name) => {
  utils.forEach(languages, (item, lang) => {
    routes.push({
      path: item.path,
      component: Page,
      props: { name, lang },
      meta: { name }
    })
  })
})

// Add language independent routes.
routes.push({
  path: '*',
  component: NotFound
})

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
