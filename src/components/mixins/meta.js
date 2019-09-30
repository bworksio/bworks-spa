import { getHeaderImage } from '../../helpers/getHeaderImage.js'

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
  const headerImg = getHeaderImage(vm.$store)
  if (title) {
    document.title = title
  }
  if (description) {
    document.querySelector('meta[name="description"]').setAttribute('content', description)
  }
  if (image || headerImg) {
    document.querySelector('meta[property="og:image"]').setAttribute('content', image || headerImg)
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', image || headerImg)
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
