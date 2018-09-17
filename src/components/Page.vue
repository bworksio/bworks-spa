<template>
  <div v-if="queue" id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
    <component
      v-for="node in queue.nodes"
      :is="componentType(node.type)"
      :nid="parseInt(node.nid)"
      :lang="lang"
      :viewMode="viewMode"
      :key="node.type + '-' + node.nid + '-' + lang" />
  </div>
</template>

<script>
  import metaMixin from '@/components/mixins/meta'
  /* eslint-disable camelcase */
  import bworks_basic_page from '@/components/sections/bworks_basic_page'
  import bworks_html_block from '@/components/sections/bworks_html_block'
  const bworks_project_block_full = () => import(/* webpackChunkName: "projects" */'@/components/sections/bworks_project_block_full')
  import bworks_project_block_teaser from '@/components/sections/bworks_project_block_teaser'
  import bworks_speciality_block from '@/components/sections/bworks_speciality_block'
  import bworks_links_block from '@/components/sections/bworks_links_block'
  import bworks_article from '@/components/nodes/bworks_article'
  const bworks_blog_block = () => import(/* webpackChunkName: "blog" */'@/components/sections/bworks_blog_block')
  const bworks_careers_block = () => import(/* webpackChunkName: "careers" */'@/components/sections/bworks_careers_block')
  const bworks_team_members_block = () => import(/* webpackChunkName: "team" */'@/components/sections/bworks_team_members_block')
  const bworks_certificate_block = () => import(/* webpackChunkName: "team" */'@/components/sections/bworks_certificate_block')
  import bworks_other_specialties_block from '@/components/sections/bworks_other_specialties_block'
  import bworks_clients_block from '@/components/sections/bworks_clients_block'
  import bworks_awards_block from '@/components/sections/bworks_awards_block'
  import bworks_press_mentions_block from '@/components/sections/bworks_press_mentions_block'
  const bworks_contact_block = () => import(/* webpackChunkName: "contact" */'@/components/sections/bworks_contact_block')
  import bworks_footer from '@/components/sections/bworks_footer'

  export default {
    name: 'Page',
    mixins: [metaMixin],

    props: {
      // Page name from route
      // @see ../router/index.js
      name: {
        type: String,
        required: true
      },
      // Language from route
      lang: {
        type: String,
        required: true
      },
      // In case of a custom page, the path without lang prefix
      path: {
        type: String
      }
    },

    computed: {
      queue () {
        return this.name !== 'custom'
          // Get section nodes from active queue in store
          ? this.$store.getters.getQueue(this.name)
          : this.$store.getters.getQueueByPath(this.$route.params[0], this.lang)
      },

      /** @var {String} The view mode for contents to display, 'teaser' on home page, 'full' otherwise */
      viewMode () {
        return this.$route.meta.name === 'home' ? 'teaser' : 'full'
      }
    },

    asyncData ({ app, route }) {
      const lang = route.matched[0].props.default.lang
      app.$i18n.locale = lang
      app.$store.commit('setLanguage', lang)
      return app.$store.dispatch('getData', lang)
    },

    created () {
      if (!this.queue) {
        this.$router.push({ name: 'not_found' })
      }
    },

    meta () {
      if (this.queue && this.queue.meta[this.$i18n.locale]) {
        return {
          title: this.queue.meta[this.$i18n.locale].title || '',
          description: this.queue.meta[this.$i18n.locale].description || '',
          image: this.queue.meta[this.$i18n.locale].image_src || ''
        }
      }
      return {}
    },

    methods: {
      componentType (type) {
        // To be able to use code splitting for the projects page,
        // we need to separate components. Moves all jQuery code out of
        // vendor chunk.
        return type === 'bworks_project_block' ? type + '_' + this.viewMode : type
      }
    },

    components: {
      bworks_basic_page,
      bworks_html_block,
      bworks_project_block_full,
      bworks_project_block_teaser,
      bworks_speciality_block,
      bworks_links_block,
      bworks_article,
      bworks_blog_block,
      bworks_careers_block,
      bworks_team_members_block,
      bworks_certificate_block,
      bworks_other_specialties_block,
      bworks_clients_block,
      bworks_awards_block,
      bworks_press_mentions_block,
      bworks_contact_block,
      bworks_footer
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';
</style>
