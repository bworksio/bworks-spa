<template>
  <div class="node-bworks_press_mentions_block">
    <div class="container-fluid">
      <div class="col-md-8 offset-md-2">
        <h2>{{ getField('title') }}</h2>
        <div class="body" v-if="getField('body')" v-html="getField('body')" />
      </div>
      <ul class="row">
        <li v-for="node in nodes" class="col-md-6 col-lg-4">
          <bworks_press_mention :nid="node.nid[0].value" :lang="lang" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  /* eslint-disable camelcase */
  import bworks_press_mention from '@/components/nodes/bworks_press_mention'
  const forEach = require('axios/lib/utils.js').forEach

  export default {
    name: 'bworks_press_mentions_block',

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
      bworks_press_mention
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_press_mentions_block {
    .container-fluid {
      padding-top: 4rem;
      padding-bottom: 2rem;
      background-color: $gray-bg;
    }

    h2 {
      margin-bottom: 1rem;
    }

    .body {
      margin-bottom: 3rem;
    }

    ul > li {
      margin-top: 2rem;
    }
  }
</style>
