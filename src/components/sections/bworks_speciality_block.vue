<template>
  <div :class="'node node-' + node.type[0].target_id">
    <h2>{{ node.title[0].value }}</h2>
    <ul>
      <li v-for="specialty in node.field_entity_reference">
        <speciality :nid="specialty.target_id" :lang="lang" viewMode="teaser"></speciality>
      </li>
    </ul>
  </div>
</template>

<script>
  import speciality from '../nodes/speciality'

  export default {
    name: 'bworks_speciality_block',
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
      speciality
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .node {
    ul {
      list-style: none;
    }
  }
</style>
