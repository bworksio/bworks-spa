<template>
  <transition name="slide">
    <div v-if="nodes" class="content" :class="name" :key="lang +'/'+ name">
      <div v-for="node in nodes" class="node" :class="node.type">
        <component :is="node.type" :nid="node.nid"></component>
      </div>
    </div>
  </transition>
</template>

<script>
import { getData } from '../store'
/* eslint-disable camelcase */
import bworks_basic_page from './sections/bworks_basic_page'
import bworks_html_block from './sections/bworks_html_block'
import bworks_project_block from './sections/bworks_project_block'
import bworks_speciality_block from './sections/bworks_speciality_block'

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
  created () {
    // Update current language in the store.
    this.$store.state.currentLanguage = this.lang
    // Update nodes to display for the current queue name.
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      // FIXME Resetting node list is required, otherwise DOM doesn't re-render on $route change.
      this.nodes = []
      getData(this.lang).then(() => {
        // Get section nodes from active queue in store
        this.nodes = this.$store.getters.getNodesForQueue(this.name)
      })
    }
  },
  components: {
    bworks_basic_page,
    bworks_html_block,
    bworks_project_block,
    bworks_speciality_block
  }
}
</script>

<style>
.content {
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
