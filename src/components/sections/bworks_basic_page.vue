<template>
  <div :class="'node node-' + node.type[0].target_id"
    :style="{ 'background-image': 'url(' + node.field_header_image[0].url + ')' }">
    <h1>{{ node.title[0].value }}</h1>
    <div v-html="node.body[0].value"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'bworks_basic_page',
    props: {
      // Node id of the section
      nid: {
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
        node: {}
      }
    },
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
