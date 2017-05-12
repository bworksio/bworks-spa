<template>
  <div class="node-bworks_certificate_block">
    <div class="container">
      <ul class="row">
        <li v-for="node in nodes" class="col-md-6">
          <bworks_certificate :nid="node.nid[0].value" :lang="lang"></bworks_certificate>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { forEach } from '../../utils'
  import Node from '../nodes/Node'
  /* eslint-disable camelcase */
  import bworks_certificate from '../nodes/bworks_certificate'

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

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_certificate_block {
    li:nth-child(odd) {
      padding-right: 2rem;
    }
    li:nth-child(even) {
      padding-left: 2rem;
    }
  }
</style>
