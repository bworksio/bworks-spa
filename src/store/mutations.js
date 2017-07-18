export default {
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
}
