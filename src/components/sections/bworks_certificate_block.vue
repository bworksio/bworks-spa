<template>
  <div class="node node-bworks_certificate_block">
    <div class="container">
      <ul class="row">
        <li v-for="node in nodes" class="col-md-6">
          <bworks_certificate :nid="node.nid[0].value" :lang="lang"></bworks_certificate>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  /* eslint-disable camelcase */
  import bworks_certificate from '@/components/nodes/bworks_certificate'
  const forEach = require('axios/lib/utils.js').forEach

  export default {
    name: 'bworks_certificate_block',

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
      bworks_certificate
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_certificate_block {
    @include media-breakpoint-up(md) {
      li:nth-child(odd) {
        padding-right: 2rem;
      }
      li:nth-child(even) {
        padding-left: 2rem;
      }
    }
  }
</style>
