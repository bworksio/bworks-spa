<template>
  <div :class="'node node-' + node.type[0].target_id">
    <div class="container">
      <div v-html="node.field_body_addresses[0].value"></div>
      <div v-html="node.field_body_social_links[0].value"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'bworks_footer',
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
  @import '../../assets/scss/mixins';

  .node-bworks_footer {
    padding-top: 4rem;
  }
</style>
