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
    const { title, description } = getMeta(this)
    if (title) {
      this.$ssrContext.title = title
    }
    if (description) {
      this.$ssrContext.description = description
    }
  }
}

const clientMetaMixin = {
  mounted () {
    const { title, description } = getMeta(this)
    if (title) {
      document.title = title
    }
    if (description) {
      document.querySelector('meta[name="description"]').setAttribute('content', description)
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin
