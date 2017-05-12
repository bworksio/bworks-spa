<template>
  <div class="node node-bworks_blog_block">
    <div class="container">
      <ul class="row">
        <li v-for="node in nodes" class="col-sm-6 col-md-4">
          <bworks_article :nid="node.nid[0].value" :lang="lang" viewMode="list"></bworks_article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../nodes/Node'
  /* eslint-disable camelcase */
  import bworks_article from '../nodes/bworks_article'

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
      this.nodes = this.$store.getters.getNodesByType('bworks_article', /*this.lang*/ 'en')
    },
    components: {
      bworks_article
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';
</style>
