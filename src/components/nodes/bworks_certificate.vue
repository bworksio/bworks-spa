<template>
  <div :class="'node-' + getType()">
    <h4>{{ getField('title') }}</h4>
    <div class="description">
      <div class="logo">
        <drupal-image :image="node.field_logo[0]" />
      </div>
      <div class="body" v-html="getField('body')" />
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import DrupalImage from '@/components/elements/DrupalImage'

  export default {
    name: 'bworks_certificate',

    extends: Node,

    components: {
      DrupalImage
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_certificate {
    h4 {
      padding-bottom: .5rem;
      margin-bottom: 1.57142rem;
      border-bottom: 1px solid $gray-bg;
    }

    .logo {
      padding-right: 25px;
      margin-bottom: 1.57142rem;
      text-align: center;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    @include media-breakpoint-up(lg) {
      .description {
        display: flex;
        overflow: hidden;
      }

      .logo {
        width: 25%;
      }

      .body {
        width: 75%;
        padding-left: 25px;
      }
    }
  }
</style>
