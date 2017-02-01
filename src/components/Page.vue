<template>
  <transition name="slide">
    <div v-if="nodes" class="content" :class="name" :key="name">
      <div v-for="nid in nodes" class="node" :class="nid">
        <Node :nid="nid"></Node>
      </div>
    </div>
  </transition>
</template>

<script>
import { getData } from '../store'
import Node from './Node'

export default {
  name: 'Page',
  props: {
    name: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nodes: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      // Reset nodes first, otherwise DOM won't be re-rendered on $route change.
      this.nodes = []
      getData(this.lang).then(() => {
        this.nodes = this.$store.state.queues[this.name].nodes
      })
    }
  },
  components: {
    Node: Node
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
