<template>
  <div class="node">
    <h2>{{ node.title[0].value }}</h2>
    <p v-html="node.body[0].value"></p>
  </div>
</template>

<script>
  export default {
    name: 'Node',
    props: {
      nid: String,
      required: true
    },
    data () {
      return {
        node: {}
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.node = this.$store.state.nodes[this.nid]
      }
    }
  }
</script>
