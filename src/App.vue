<template>
  <div id="app">
    <site-header />
    <router-view />
    <preload-overlay />
  </div>
</template>

<script type="text/javascript">
  import SiteHeader from './components/elements/SiteHeader'
  import PreloadOverlay from './components/elements/PreloadOverlay'

  export default {
    name: 'App',

    created () {
      this.updateLanguage()
    },

    watch: {
      '$route' (to, from) {
        this.updateLanguage()
      }
    },

    methods: {
      /**
       * Update global language in store from current route.
       */
      updateLanguage () {
        if (this.$route.matched.length && this.$route.matched[0].components.default.name !== 'NotFound') {
          const lang = this.$route.matched[0].props.default.lang
          this.$store.commit('setLanguage', lang)
          this.$i18n.locale = lang
        }
      }
    },

    components: {
      SiteHeader,
      PreloadOverlay
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  // Load global styles
  @import './assets/scss/main';
</style>
