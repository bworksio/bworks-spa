<template>
  <div v-if="nodes" id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
    <component
      v-for="node in nodes"
      :is="componentType(node.type)"
      :nid="parseInt(node.nid)"
      :lang="lang"
      :viewMode="viewMode"
      :key="node.type + '-' + node.nid + '-' + lang" />
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable camelcase */
  import bworks_basic_page from '@/components/sections/bworks_basic_page'
  import bworks_html_block from '@/components/sections/bworks_html_block'
  const bworks_project_block_full = () => import(/* webpackChunkName: "projects" */'@/components/sections/bworks_project_block_full')
  import bworks_project_block_teaser from '@/components/sections/bworks_project_block_teaser'
  import bworks_speciality_block from '@/components/sections/bworks_speciality_block'
  import bworks_article from '@/components/nodes/bworks_article'
  import bworks_blog_block from '@/components/sections/bworks_blog_block'
  import bworks_careers_block from '@/components/sections/bworks_careers_block'
  import bworks_team_members_block from '@/components/sections/bworks_team_members_block'
  import bworks_certificate_block from '@/components/sections/bworks_certificate_block'
  import bworks_other_specialties_block from '@/components/sections/bworks_other_specialties_block'
  import bworks_clients_block from '@/components/sections/bworks_clients_block'
  import bworks_awards_block from '@/components/sections/bworks_awards_block'
  import bworks_press_mentions_block from '@/components/sections/bworks_press_mentions_block'
  const bworks_contact_block = () => import(/* webpackChunkname: "contact" */'@/components/sections/bworks_contact_block')
  import bworks_footer from '@/components/sections/bworks_footer'

  export default {
    name: 'Page',

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
      }
    },

    data () {
      return {
        // The list of section nodes to be displayed.
        nodes: []
      }
    },

    computed: {
      /** @var {String} The view mode for contents to display, 'teaser' on home page, 'full' otherwise */
      viewMode () {
        return this.$route.meta.name === 'home' ? 'teaser' : 'full'
      }
    },

    created () {
      // Update nodes to display for the current queue name.
      this.fetchData()
    },

    watch: {
      '$route' (to, from) {
        this.fetchData()
      }
    },

    methods: {
      /**
       * Fetches the list of nodes in the current queue to display.
       */
      fetchData () {
        return this.$store.dispatch('getData', this.lang).then(() => {
          // Get section nodes from active queue in store
          const queue = this.$store.getters.getQueue(this.name)
          this.nodes = queue.nodes

          // Set meta data
/*
          if (queue.meta.title) {
            document.title = queue.meta.title
          }
          if (queue.meta.description) {
            const el = document.createElement('meta')
            el.name = 'description'
            el.content = queue.meta.description
            document.getElementsByTagName('head')[0].appendChild(el)
          }
*/

          // Emit trigger event for webpack prerender_spa_plugin
/*
          window.setTimeout(() => {
            /!* global Event *!/
            document.dispatchEvent(new Event('prerender'))
          }, 100)
*/
        }).catch(() => {
          /* Error handled upstream */
        })
      },

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

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';
</style>
