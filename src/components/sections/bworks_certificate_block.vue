<template>
  <div class="node-bworks_certificate_block">
    <div class="container">
      <div class="row">
        <div v-for="certificateNode in nodes" class="col-md-6">
          <bworks_certificate :nid="certificateNode.nid[0].value" :lang="lang"></bworks_certificate>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { forEach } from '../../utils'
  import Node from '../helpers/Node'
  /* eslint-disable camelcase */
  import bworks_certificate from './bworks_certificate'

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

  .node-bworks_team_members_block {}
</style>
