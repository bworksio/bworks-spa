function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
  return {}
}
const serverMetaMixin = {
  created () {
    const meta = getMeta(this);
    ['title', 'description', 'image'].forEach(el => {
      if (meta[el]) {
        this.$ssrContext[el] = meta[el]
      }
    })
  }
}
function getClientMeta (vm) {
  const { title, description, image } = getMeta(vm)
  const { type: nodeType, nid: nodeId} = vm.queue.nodes[0]
  const nodeData = vm.$store.getters.getNode(nodeId, vm.lang)
  if (title) {
    document.title = title
  }
  if (description) {
    document.querySelector('meta[name="description"]').setAttribute('content', description)
  }
  if (image) {
    document.querySelector('meta[property="og:image"]').setAttribute('content', image)
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', image)
  } else if (nodeType === 'bworks_basic_page'
          && nodeData.field_header_image
          && nodeData.field_header_image[0]
          && nodeData.field_header_image[0].url
  ) {
    const imgUrl = nodeData.field_header_image[0].url
    document.querySelector('meta[property="og:image"]').setAttribute('content', imgUrl)
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', imgUrl)
  }
}
const clientMetaMixin = {
  mounted () {
    getClientMeta(this)
  },
  watch: {
    '$route' (to, from) {
      getClientMeta(this)
    }
  }
}
export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin