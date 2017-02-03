import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config/app.json'
import Axios from 'axios'

Vue.use(Vuex)

// Create and configure instance.
const axios = Axios.create({
  baseURL: config.api.baseUrl
})

/**
 * Query a list of queues.
 * @returns {AxiosPromise}
 */
function getQueues () {
  if (!Object.keys(store.state.queues).length) {
    return axios.get('spa_api/entityqueues')
      .then(result => {
        store.commit('setQueues', result.data)
      })
  }
  return new Promise(resolve => { resolve() })
}

/**
 * Query a list of all nodes for a specific language.
 * @param {String} lang
 * @returns {AxiosPromise|Promise}
 */
function getNodes (lang) {
  if (!Object.keys(store.getters.getNodes(lang)).length) {
    return axios.get(lang + '/spa_api/contents')
      .then(result => {
        store.commit('setNodes', { nodes: result.data, lang })
      })
  }
  return new Promise(resolve => { resolve() })
}

/**
 * Query all data (queues and nodes) for the specified language.
 * @param lang
 * @returns {AxiosPromise|Promise}
 */
function getData (lang) {
  if (!store.state.initialized) {
    // Data not loaded yet, query queues and nodes.
    let queries = [getQueues()]
    config.activeLanguages.forEach(activeLang => {
      queries.push(getNodes(activeLang))
    })
    return Axios.all(queries)
      .then((result) => {
        store.commit('setInitialized', true)
      })
      .catch(() => {
        store.commit('setError', new Error('Failed loading contents, check your internet connection.'))
      })
  } else {
    // Return empty promise and resolve it immediately.
    return new Promise(resolve => { resolve() })
  }
}

// Store that holds all the data used throughout the application.
const store = new Vuex.Store({
  state: {
    initialized: false,
    error: null,
    queues: {},
    nodes: {},
    currentLanguage: 'en'
  },
  mutations: {
    setInitialized (state, initialized = true) {
      state.initialized = initialized
    },
    setQueues (state, queues) {
      state.queues = queues
    },
    setNodes (state, payload) {
      state.nodes[payload.lang] = payload.nodes
    },
    setError (state, error) {
      state.error = error
    },
    setLanguage (state, lang) {
      state.currentLanguage = lang
    }
  },
  getters: {
    /**
     * Returns a list of node for a given queue.
     * @param queue
     * @returns {Array}
     */
    getNodesForQueue: (state, getters) => queue => {
      return state.queues[queue].nodes
    },

    /**
     * Returns all nodes from store for a given language.
     * @param lang
     * @returns {Object}
     */
    getNodes: (state, getters) => lang => {
      return state.nodes.hasOwnProperty(lang) ? state.nodes[lang] : {}
    },

    /**
     * Returns a single node from store for a given language, falling back to the default language.
     * @param id
     * @param lang
     * @returns {Object|boolean}
     */
    getNode: (state, getters) => (id, lang) => {
      const nodes = getters.getNodes(lang)
      if (nodes.hasOwnProperty(id)) {
        return nodes[id]
      }
      return lang !== config.defaultLanguage ? getters.getNode(id, config.defaultLanguage) : false
    },

    /**
     * Returns the last error message, if any.
     * @param state
     * @param getters
     * @returns {String|boolean}
     */
    getError: (state, getters) => {
      return state.error !== null ? state.error.toString() : false
    }
  }
})

export { store, getData }
