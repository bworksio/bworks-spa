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

function getData (lang) {
  return Axios.all([getQueues(), getNodes(lang)])
    .then(Axios.spread((queues, nodes) => {
      store.commit('setQueues', queues.data)
      store.commit('setNodes', nodes.data)
      store.commit('setInitialized')
    }))
    .catch(() => {
      store.commit('setError', new Error('Failed loading contents, check your internet connection.'))
    })
}

const store = new Vuex.Store({
  state: {
    initialized: false,
    error: null,
    queues: {},
    nodes: {}
  },
  mutations: {
    setInitialized (state, initialized = true) {
      state.initialized = initialized
    },
    setQueues (state, queues) {
      state.queues = queues
    },
    setNodes (state, nodes) {
      state.nodes = nodes
    },
    setError (state, error) {
      state.error = error
    }
  }
})

export { store, getData }
