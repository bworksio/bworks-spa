import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config.json'
import Axios from 'axios'

Vue.use(Vuex)

// Create and configure instance.
const axios = Axios.create({
  baseURL: config.api.baseUrl
})

/**
 * Get a list of queues.
 * @returns {AxiosPromise}
 */
function getQueues () {
  return axios.get('spa_api/entityqueues')
}

/**
 * Get a list of all nodes for a specific language.
 * @param {String} lang
 * @returns {AxiosPromise}
 */
function getNodes (lang) {
  return axios.get(lang + '/spa_api/contents')
}

const store = new Vuex.Store({
  state: {
    isLoading: false,
    error: null,
    queues: {},
    nodes: {}
  },
  mutations: {
    init (state) {
      state.isLoading = true
      // TODO Pass current language
      Axios.all([getQueues(), getNodes('en')])
        .then(Axios.spread((queues, nodes) => {
          state.queues = queues.data
          state.nodes = nodes.data
          state.isLoading = false
        }))
        .catch(() => {
          state.error = new Error('Failed loading contents, check your internet connection.')
          state.isLoading = false
        })
    }
  }
})

export default store
