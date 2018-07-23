<template>
  <div class="node-bworks_awards_block">
    <div class="container">
      <ul class="row">
        <li v-for="node in nodes" class="col-sm-4">
          <bworks_award :nid="node.nid[0].value" :lang="lang"></bworks_award>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  /* eslint-disable camelcase */
  import bworks_award from '@/components/nodes/bworks_award'
  const forEach = require('axios/lib/utils.js').forEach

  export default {
    name: 'bworks_awards_block',

    extends: Node,

    data () {
      return {
        nodes: []
      }
    },

    created () {
      // Get referenced certificate nodes.
      forEach(this.node.field_entity_reference, ref => {
        this.nodes.push(this.$store.getters.getNode(ref.target_id))
      })
    },

    components: {
      bworks_award
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';
</style>
