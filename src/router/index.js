import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../components/Page'
import NotFound from '../components/NotFound'

// Init plugins.
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Page,
      props: { name: 'home' }
    },
    {
      path: '/test',
      component: Page,
      props: { name: 'test' }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
