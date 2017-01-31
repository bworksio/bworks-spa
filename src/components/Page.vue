<template>
  <div class="node">
    <p>Route name: {{name}}</p>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <transition name="slide">
      <div v-if="node" class="content" :key="node.nid">
        <h2>{{ node.title }}</h2>
        <p>{{ node.body }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { getNode } from './api'

export default {
  name: 'Page',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      node: null,
      error: null
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
    }
  }
}
</script>

<style>
.loading {
  position: absolute;
  top: 10px;
  left: auto;
  right: auto;
}
.error {
  color: red;
}
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
