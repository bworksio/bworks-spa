function getMeta(vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
  return {}
}

const serverMetaMixin = {
  created() {
    const meta = getMeta(this);
    ['title', 'description', 'image'].forEach(el => {
      if (meta[el]) {
        this.$ssrContext[el] = meta[el]
      }
    })
  }
}

function getClientMeta(vm) {
  const meta = getMeta(vm)
  if (meta.title) {
    document.title = meta.title
  }
  if (meta.description) {
    document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
  }
  var metaTagsImages = [];
  if (meta.image && meta.image.length > 0) {
    // document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    // document.querySelector('meta[name="twitter:image"]').setAttribute('content', image);
    meta.image.forEach((img) => {
      let el = document.createElement('meta');
      el.setAttribute('property', 'og:image');
      el.setAttribute('content', img);
      metaTagsImages.unshift(el.outerHTML);
      let twitterEl = document.createElement('meta');
      twitterEl.setAttribute('name', 'twitter:image');
      twitterEl.setAttribute('content', img);
      metaTagsImages.push(twitterEl.outerHTML);
    });
  }
  meta.image = metaTagsImages.join('');
}

const clientMetaMixin = {
  mounted() {
    getClientMeta(this)
  },
  watch: {
    '$route'(to, from) {
      getClientMeta(this)
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMetaMixin
  : clientMetaMixin
