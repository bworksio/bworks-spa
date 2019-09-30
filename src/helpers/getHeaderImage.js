export const getHeaderImage = (store) => {
  const lang = store.state.currentLanguage
  const name = store.state.route.meta.name
  const queue = store.getters.getQueue(name)
  if (!queue || !queue.nodes || !queue.nodes.length) return null 
  const { nid: firstNodeId, type: nodeType } = queue.nodes[0]
  const nodeData = store.getters.getNode(firstNodeId, lang)
  if (nodeType === 'bworks_basic_page'
      && nodeData.field_header_image
      && nodeData.field_header_image[0]
      && nodeData.field_header_image[0].url
  ) {
    return nodeData.field_header_image[0].url
  }
  return null
}