<template>
  <div :class="'node-' + getType()">
    <h4 class="body" v-html="getField('body')"></h4>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'

  export default {
    name: 'bworks_link',

    extends: Node,

    computed: {
      routerLink () {
        const link = this.getField('field_content_map_link', 'value', 0, false)
        if (link) {
          return this.$store.getters.getPathByQueue(link, this.lang) || ''
        }
        return ''
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_link {
    height: 100%;
    background-color: $gray-bg;

    a {
      display: block;
      height: 100%;
      padding: 1.5rem 2rem;
    }

    p {
      margin: 0;
    }
  }
</style>
