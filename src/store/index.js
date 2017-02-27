import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config/app.json'
import Axios from 'axios'
import ScrollMagic from 'scrollmagic'

Vue.use(Vuex)

// Create and configure instance.
const axios = Axios.create({
  baseURL: config.api.baseUrl,
  params: {
    t: (new Date()).getTime()
  }
})

/**
 * Query a list of queues.
 * @returns {AxiosPromise}
 */
function getQueues () {
  if (!Object.keys(store.state.queues).length) {
    return axios.get('spa_api/contents_map')
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
 * Query a list of all tags for a specific language.
 * @returns {AxiosPromise|Promise}
 */
function getTags () {
  if (!Object.keys(store.state.tags).length) {
    return axios.get('spa_api/taxonomy_terms?_format=hal_json')
      .then(result => {
        store.commit('setTags', result.data)
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
  // Data not loaded yet, query queues and nodes.
  const queries = [getQueues()]
  config.activeLanguages.forEach(activeLang => queries.push(getNodes(activeLang)))
  queries.push(getTags())
  return Axios.all(queries)
    .then((result) => {
      store.commit('setInitialized', true)
    })
    .catch(() => {
      store.commit('setError', new Error('Failed loading contents, check your internet connection.'))
    })
}

// Store that holds all the data used throughout the application.
const store = new Vuex.Store({
  state: {
    initialized: false,
    error: null,
    queues: {},
    nodes: {},
    tags: {},
    showMenu: false,
    currentLanguage: 'en',
    scrollMagicMainController: new ScrollMagic.Controller()
  },
  mutations: {
    setInitialized (state, initialized = true) {
      state.initialized = initialized
    },
    setQueues (state, queues) {
      state.queues = queues
    },
    setNodes (state, { lang, nodes }) {
      state.nodes[lang] = nodes
    },
    setTags (state, tags) {
      state.tags = tags
    },
    setError (state, error) {
      state.error = error
    },
    toggleMenu (state) {
      state.showMenu = !state.showMenu
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
    getNodesForQueue: state => queue => state.queues[queue].nodes,

    /**
     * Returns all nodes from store for a given language.
     * @param lang
     * @returns {Object}
     */
    getNodes: state => lang => state.nodes.hasOwnProperty(lang) ? state.nodes[lang] : {},

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

      if (lang !== config.defaultLanguage) {
        return getters.getNode(id, config.defaultLanguage)
      }

      // Error
      return {
        nid: id,
        type: [
          { target_id: 'missing_block' }
        ]
      }
    },

    /**
     * Returns a single tag from store for a given language, falling back to the default language.
     * @param id
     * @param lang
     * @returns {Object|boolean}
     */
    getTag: (state, getters) => (id, lang) => {
      if (store.state.tags.hasOwnProperty(id)) {
        const tags = {}
        store.state.tags[id].name.forEach(tag => {
          tags[tag.lang] = tag.value
        })
        if (tags.hasOwnProperty(lang)) {
          return tags[lang]
        }
        if (tags.hasOwnProperty(config.defaultLanguage)) {
          return tags[config.defaultLanguage]
        }
      }

      // Error
      return false
    }
  }
})

export { store, getData }
