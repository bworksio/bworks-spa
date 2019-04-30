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

<script>
  import Node from '@/components/nodes/Node'
  /* eslint-disable camelcase */
  import bworks_article from '@/components/nodes/bworks_article'

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

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_blog_block {
    ul.row > li {
      margin-bottom: calc(2rem + 4vh);
    }
  }
</style>
