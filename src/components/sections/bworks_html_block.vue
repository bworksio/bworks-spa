<template>
  <div class="node" :class="node.type[0].target_id">
    <h2>{{ node.title[0].value }}</h2>
    <p v-html="node.body[0].value"></p>
  </div>
</template>

<script>
export default {
  name: 'bworks_html_block',
  props: {
    // Node id of the section
    nid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      node: {}
    }
  },
  created () {
    this.node = this.$store.getters.getNode(this.nid, this.$store.state.currentLanguage)
  }
}
</script>
