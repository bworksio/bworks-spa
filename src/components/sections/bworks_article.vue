<template>
  <div :class="'node node-' + node.type[0].target_id">
    <div class="container">
      <drupal-image :image="node.field_image[0]"></drupal-image>
      <div v-html="node.body[0].value"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_article',
    props: {
      // Node id of the section
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        node: {}
      }
    },
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    },
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
