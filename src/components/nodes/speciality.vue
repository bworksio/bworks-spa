<template>
  <div :class="'node node-' + node.type[0].target_id + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <a href="#">
        <img :src="node.field_logo[0].url">
        <h2>{{ node.title[0].value }}</h2>
      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <img :src="node.field_logo[0].url">
      <h2>{{ node.title[0].value }}</h2>
      <div v-html="node.body[0].value"></div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'speciality',
    props: {
      // Node id of the project
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      },
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
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
