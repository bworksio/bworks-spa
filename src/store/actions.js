import Axios from 'axios'
import 'axios-debug-log'
import config from '@/config/app.json'

// Create and configure instance.
const axios = Axios.create()

export default {
  /**
   * Query all data (queues, nodes, tags) for all languages.
   */
  getData ({ state, getters, commit }) {
    const url = config.api.middlewareUrl + ('refresh' in state.route.query ? '?refresh' : '')
    return axios.get(url).then(result => {
      commit('setQueues', result.data.queues)
      config.activeLanguages.forEach(lang => {
        commit('setNodes', { nodes: result.data.contents[lang], lang })
      })
      commit('setTags', result.data.tags)
      commit('setInitialized', true)
    }).catch(() => {
      commit('setError', new Error('Failed loading contents.'))
    })
  }
}
