<template>
  <div id="app">
    <site-header />
    <router-view />
  </div>
</template>

<script>
  import config from '@/config/app.json'
  import SiteHeader from '@/components/elements/SiteHeader'

  export default {
    name: 'App',

    created () {
      this.updateLanguage()

      if (process.env.VUE_ENV === 'server') {
        this.$ssrContext.googleAnalyticsId = config.googleAnalyticsId
        this.$ssrContext.cc_message = this.$i18n.t('cookieconsent.message')
        this.$ssrContext.cc_deny = this.$i18n.t('cookieconsent.deny')
        this.$ssrContext.cc_allow = this.$i18n.t('cookieconsent.allow')
        this.$ssrContext.cc_link = this.$i18n.t('cookieconsent.link')
        this.$ssrContext.cc_href = this.$i18n.t('cookieconsent.href')
      }
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

<style lang="scss">
  // Global styles
  @import 'assets/scss/main';
</style>
