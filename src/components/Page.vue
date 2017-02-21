<template>
  <transition name="slide">
    <div v-if="nodes" id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
      <component
        v-for="node in nodes"
        :is="node.type"
        :nid="node.nid"
        :lang="lang"
        :viewMode="viewMode"></component>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import { getData } from '../store'
  /* eslint-disable camelcase */
  import bworks_basic_page from './sections/bworks_basic_page'
  import bworks_html_block from './sections/bworks_html_block'
  import bworks_project_block from './sections/bworks_project_block'
  import bworks_speciality_block from './sections/bworks_speciality_block'
  import bworks_article from './sections/bworks_article'
  import bworks_footer from './sections/bworks_footer'

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
        // FIXME Resetting node list is required, otherwise DOM doesn't re-render on $route change.
        this.nodes = []
        getData(this.lang).then(() => {
          // Get section nodes from active queue in store
          this.nodes = this.$store.getters.getNodesForQueue(this.name)
        }).catch(() => {
          /* Error handled upstream */
        })
      }
    },
    components: {
      bworks_basic_page,
      bworks_html_block,
      bworks_project_block,
      bworks_speciality_block,
      bworks_article,
      bworks_footer
    }
  }
</script>

<style>
.page {
  transition: all .35s ease;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
