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
      props: { name: 'home', lang: 'en' }
    },
    {
      path: '/it',
      component: Page,
      props: { name: 'home', lang: 'it' }
    },
    {
      path: '/specialties',
      component: Page,
      // FIXME Typo in machine name special[i]ties
      props: { name: 'specialities', lang: 'en' }
    },
    {
      path: '/it/specialita',
      component: Page,
      props: { name: 'specialities', lang: 'it' }
    },

    {
      path: '*',
      component: NotFound
    }
  ]
})
