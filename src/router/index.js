import Vue from 'vue'
import VueRouter from 'vue-router'

// Init plugins.
Vue.use(VueRouter)

import Home from '../components/Home'
import NotFound from '../components/NotFound'

// Define routes.
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  mode: 'history',
  routes: routes
})
