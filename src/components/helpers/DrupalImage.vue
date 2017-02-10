<template lang="html">
  <img :src="image.url" :width="image.width" :height="image.height" :alt="image.alt">
</template>

<script type="text/javascript">
  /**
   * Renders a Drupal image field.
   */
  export default {
    name: 'DrupalImage',
    // Component properties/variables
    props: {
      image: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
