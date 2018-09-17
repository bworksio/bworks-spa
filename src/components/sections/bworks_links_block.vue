<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <ul class="row">
        <li v-for="link in node.field_links" class="col-md-6 col-lg-3">
          <bworks_link :nid="link.target_id" :lang="lang"></bworks_link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_link from '@/components/nodes/bworks_link'

  export default {
    name: 'bworks_links_block',
    extends: Node,
    components: {
      bworks_link
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';
</style>
