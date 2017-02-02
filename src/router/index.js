import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from '../config/routes'
import utils from '../utils'
import Page from '../components/Page'
import NotFound from '../components/NotFound'

// Init plugins.
Vue.use(VueRouter)

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

routes.push({
  path: '*',
  component: NotFound
})

export default new VueRouter({
  mode: 'history',
  routes
})
