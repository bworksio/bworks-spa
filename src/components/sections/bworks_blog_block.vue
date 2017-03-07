<template>
  <div class="node node-bworks_blog_block">
    <div class="container">
      <div class="row">
        <bworks_article v-for="node in nodes" :nid="node.nid[0].value" :lang="lang" viewMode="list"></bworks_article>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  /* eslint-disable camelcase */
  import bworks_article from './bworks_article'

  export default {
    name: 'bworks_blog_block',
    extends: Node,
    data () {
      return {
        nodes: []
      }
    },
    created () {
      // Get all articles
      this.nodes = this.$store.getters.getNodesByType('bworks_article', this.lang)
    },
    components: {
      bworks_article
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';
</style>
