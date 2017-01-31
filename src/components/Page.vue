<template>
  <div class="node">
    <p>Route name: {{name}}</p>
    <transition name="slide">
      <div v-if="node" class="content" :key="node.nid">
        <h2>{{ node.title[0].value }}</h2>
        <p v-html="node.body[0].value"></p>
      </div>
    </transition>
  </div>
</template>

<script>
//import { getNode } from './api'
import { getData } from '../store'

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
      node: null
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
      if (!this.$store.state.initialized) {
        // TODO Pass language from route
        getData(this.lang).then(() => {
          this.node = this.$store.state.nodes[1]
        })
      }

/*
      this.error = this.node = null
      this.loading = true
      getNode(this.name, (err, node) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.node = node
        }
      })
*/
    }
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
