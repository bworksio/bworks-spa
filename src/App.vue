<template>
  <div id="app">
    <site-header />
    <router-view />
  </div>
</template>

<script>
  import SiteHeader from '@/components/elements/SiteHeader'

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
      SiteHeader
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  // Global styles
  @import 'assets/scss/main';
</style>
