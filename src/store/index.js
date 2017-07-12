import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import ImagePreloader from 'image-preloader'
import ScrollMagic from 'scrollmagic'
import config from '@/config/app.json'
const forEach = require('axios/lib/utils.js').forEach

Vue.use(Vuex)

// Create and configure instance.
const axios = Axios.create({
  baseURL: config.api.baseUrl,
  params: {
    t: Math.floor((new Date()).getTime() / 10000).toString()
  }
})

let preloadImages = []

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
  return Promise.resolve()
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
        // Collect header images for preloading
        forEach(result.data, node => {
          if ('field_header_image' in node && node.field_header_image[0].url) {
            preloadImages.push(node.field_header_image[0].url)
          }
        })
        store.commit('setNodes', { nodes: result.data, lang })
      })
  }
  return Promise.resolve()
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
  return Promise.resolve()
}

/**
 * Query all data (queues, nodes, tags) for all languages.
 * @returns {AxiosPromise|Promise}
 */
function getData () {
  const queries = [getQueues()]
  config.activeLanguages.forEach(activeLang => queries.push(getNodes(activeLang)))
  queries.push(getTags())
  return Axios.all(queries)
    .then(() => {
      // FIXME Loading only current header image (bworks_basic_page) requires refactoring of getData() into the main getQueue() function
      if (0 && !store.state.isPhantom) {
        // Preload header images
        const preloader = new ImagePreloader()
        preloader
          .preload(...preloadImages)
          .then(function (status) {
            store.commit('setInitialized', true)
          })
      } else {
        store.commit('setInitialized', true)
      }
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
    scrollMagicMainController: new ScrollMagic.Controller(),
    isPhantom: /PhantomJS/.test(window.navigator.userAgent)
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
     * @param {string} queue
     * @returns {Array}
     */
    getQueue: state => queue => state.queues[queue],

    /**
     * Returns all nodes from store for a given language.
     * @param {string} lang
     * @returns {Object}
     */
    getNodes: state => lang => state.nodes.hasOwnProperty(lang) ? state.nodes[lang] : {},

    /**
     * Returns all nodes from store with the given type.
     * @param {string} type
     * @param {string} lang
     * @returns {Array}
     */
    getNodesByType: (state, getters) => (type, lang) => {
      const nodes = []
      forEach(getters.getNodes(lang), node => {
        if (node.type[0].target_id === type) {
          nodes.push(node)
        }
      })
      return nodes
    },

    /**
     * Returns a single node from store for a given language, falling back to the default language.
     * @param {string} id
     * @param {string} lang
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
        ],
        error: true
      }
    },

    /**
     * Returns a node given its path.
     * @param {string} path
     * @param {string} lang
     * @returns {Object|boolean}
     */
    getNodeByPath: (state, getters) => (path, lang) => {
      let found
      // Remove trailing slash
      path = path.replace(/\/+$/, '')
      forEach(getters.getNodes(lang), node => {
        if (node.path.length && (path === node.path[0].alias)) {
          found = node
        }
      })

      if (found) {
        return found
      }

      // Error
      return {
        nid: [{ value: '0' }],
        type: [{ target_id: 'missing_node' }]
      }
    },

    /**
     * Returns a single tag from store for a given language, falling back to the default language.
     * @param {string} id
     * @param {string} lang
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
