<template lang="html"></template>

<script type="text/javascript">
  /**
   * Abstract Drupal Node.
   */
  export default {
    name: 'Node',
    // Component properties/variables
    props: {
      // Language
      lang: {
        type: String,
        required: true
      },
      // Node id
      nid: {
        type: String,
        required: true
      }
    },
    // Variables
    data () {
      return {
        node: {}
      }
    },
    // Methods
    methods: {
      getField (name, property = 'value', index = 0, defaultValue = 'Missing') {
        return this.node[name] && this.node[name][index] ? this.node[name][index][property] : defaultValue
      },
      getType () {
        return this.getField('type', 'target_id')
      }
    },
    // Component lifecycle hooks
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
