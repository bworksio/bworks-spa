import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

// Store that holds all the data used throughout the application.
export function createStore () {
  return new Vuex.Store({
    state: {
      initialized: false,
      error: null,
      queues: {},
      nodes: {},
      tags: {},
      showMenu: false,
      currentLanguage: 'en'
    },
    actions,
    mutations,
    getters
  })
}
