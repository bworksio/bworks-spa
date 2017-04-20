<template>
  <div :class="'node node-' + getType()">
    <div class="h2 certificate">{{ getField('title') }}</div>
    <div class="logo-wrapper">
      <drupal-image :image="node.field_logo[0]"></drupal-image>
    </div>
    <div v-html="getField('body')" class="body"></div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_certificate',

    extends: Node,

    components: {
      DrupalImage
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_certificate {}
</style>
