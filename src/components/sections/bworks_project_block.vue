<template>
  <div :class="'node node-' + node.type[0].target_id">
    <h2>{{ node.title[0].value }}</h2>
    <ul>
      <li v-for="project in node.field_entity_reference">
        <project :nid="project.target_id" :lang="lang" viewMode="teaser"></project>
      </li>
    </ul>
  </div>
</template>

<script>
  import project from '../nodes/project'

  export default {
    name: 'bworks_project_block',
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
      project
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
