import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '../store'
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
      props: { name, lang }
    })
  })
})

// Add special routes.
routes.push({
  path: '*',
  component: NotFound,
  // FIXME Need to implement navigation guard here as well, otherwise NotFound.beforeRouteEnter won't be triggered.
  beforeEnter: (to, from, next) => {
    next()
  }
})

const router = new VueRouter({
  mode: 'history',
  routes
})

// Add navigation guard to update current language.
router.beforeEach((to, from, next) => {
  if (to.matched.length && to.matched[0].components.default.name !== 'NotFound') {
    store.state.currentLanguage = to.matched[0].props.default.lang
  }
  next()
})

export default router
