<template>
  <div :class="'node-' + getType()">
    <div class="logo">
      <drupal-image :image="node.field_logo[0]" />
    </div>
    <div class="body" v-html="getField('body')" />
  </div>
</template>

<script type="text/javascript">
  import Node from '@/components/nodes/Node'
  import DrupalImage from '@/components/elements/DrupalImage'

  export default {
    name: 'bworks_award',

    extends: Node,

    components: {
      DrupalImage
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .node-b_works_award {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    margin-left: 2rem;
    margin-right: 2rem;

    .logo {
      display: flex;
      flex-basis: 100%;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.57142rem;

      img {
        max-width: 100%;
        max-height: 10rem;
        width: auto;
        height: auto;
      }
    }

    .body {
      flex-basis: 2rem;
      font-size: $font-size-h3;
      line-height: 1.38889;
      letter-spacing: .06667em;
      color: $gray-color;
      text-align: right;
    }
  }
</style>
