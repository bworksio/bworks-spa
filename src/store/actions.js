import Axios from 'axios'
import 'axios-debug-log'
import ImagePreloader from 'image-preloader'
import config from '@/config/app.json'

// Create and configure instance.
const axios = Axios.create({ baseURL: config.api.baseUrl })

export default {
  /**
   * Query all data (queues, nodes, tags) for all languages.
   */
  getData ({ state, getters, commit }) {
    let preloadImages = []

    /**
     * Query a list of queues.
     * @returns {AxiosPromise}
     */
    const getQueues = function () {
      if (!Object.keys(state.queues).length) {
        return axios.get('spa_api/contents_map?_format=json')
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
        return axios.get(lang + '/spa_api/contents?_format=json')
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
        .then(() => {
          commit('setInitialized', true)
        })
      } else {
        commit('setInitialized', true)
      }
    })
    .catch(() => {
      commit('setError', new Error('Failed loading contents.'))
    })
  }
}
