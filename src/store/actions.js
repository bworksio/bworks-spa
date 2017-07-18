import Axios from 'axios'
import ImagePreloader from 'image-preloader'
import config from '@/config/app.json'
const forEach = require('axios/lib/utils.js').forEach

// Create and configure instance.
const axios = Axios.create({
  baseURL: config.api.baseUrl/*,
   params: {
   t: Math.floor((new Date()).getTime() / 10000).toString()
   }*/
})

let preloadImages = []

export default {
  /**
   * Query all data (queues, nodes, tags) for all languages.
   */
  getData ({ state, getters, commit }, currentLang) {
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
          forEach(result.data, node => {
            if ('field_header_image' in node && node.field_header_image[0].url) {
              preloadImages.push(node.field_header_image[0].url)
            }
          })
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
      // FIXME Loading only current header image (bworks_basic_page) requires refactoring of getData() into the main getQueue() function
      if (0 && !store.state.isPhantom) {
        // Preload header images
        const preloader = new ImagePreloader()
        preloader
        .preload(...preloadImages)
        .then(function (status) {
          commit('setInitialized', true)
        })
      }
      else {
        commit('setInitialized', true)
      }
    })
    .catch(() => {
      commit('setError', new Error('Failed loading contents, check your internet connection.'))
    })
  }
}
