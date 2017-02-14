<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <drupal-image :image="node.field_image[0]"></drupal-image>
      <div v-html="getField('body')"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_article',
    extends: Node,
    components: {
      'drupal-image': DrupalImage
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_article {
    padding-top: 4rem;
  }
</style>
