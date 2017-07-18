export default {
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
    if (state.tags.hasOwnProperty(id)) {
      const tags = {}
      state.tags[id].name.forEach(tag => {
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
