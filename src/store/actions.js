import Axios from 'axios'
import ImagePreloader from 'image-preloader'
import config from '@/config/app.json'
const forEach = require('axios/lib/utils.js').forEach

// Create and configure instance.
const options = { baseURL: config.api.baseUrl }
if (process.env.NODE_ENV !== 'production') {
  options.params = { t: Math.floor((new Date()).getTime() / (10 * 1000)).toString() }
}
const axios = Axios.create(options)

let preloadImages = []

export default {
  /**
   * Query all data (queues, nodes, tags) for all languages.
   */
  getData ({ state, getters, commit }) {
    /**
     * Query a list of queues.
     * @returns {AxiosPromise}
     */
    const getQueues = function () {
      if (!Object.keys(state.queues).length) {
        return axios.get('spa_api/contents_map')
        .then(result => {
          commit('setQueues', result.data)
        })
      }
      return Promise.resolve()
    }

    /**
     * Query a list of all nodes for a specific language.
     * @param {String} lang
     * @returns {AxiosPromise|Promise}
     */
    const getNodes = function (lang) {
      if (!Object.keys(getters.getNodes(lang)).length) {
        return axios.get(lang + '/spa_api/contents')
        .then(result => {
          // Collect header images for preloading
          /*
          // FIXME Load only current header image (bworks_basic_page of queue)
          forEach(result.data, node => {
            if ('field_header_image' in node && node.field_header_image[0].url) {
              preloadImages.push(node.field_header_image[0].url)
            }
          })
          */
          commit('setNodes', { nodes: result.data, lang })
        })
      }
      return Promise.resolve()
    }

    /**
     * Query a list of all tags for a specific language.
     * @returns {AxiosPromise|Promise}
     */
    const getTags = function () {
      if (!Object.keys(state.tags).length) {
        return axios.get('spa_api/taxonomy_terms?_format=hal_json')
        .then(result => {
          commit('setTags', result.data)
        })
      }
      return Promise.resolve()
    }

    const queries = [getQueues()]
    config.activeLanguages.forEach(activeLang => queries.push(getNodes(activeLang)))
    queries.push(getTags())

    return Axios.all(queries).then(() => {
      // Preload header images
      if (preloadImages.length) {
        const preloader = new ImagePreloader()
        preloader.preload(...preloadImages)
        .then(status => {
          commit('setInitialized', true)
        })
      } else {
        commit('setInitialized', true)
      }
    })
    .catch(error => {
      commit('setError', new Error('Failed loading contents.'))
    })
  }
}
