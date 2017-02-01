<template>
  <div class="node" :class="node.type[0].target_id">
    <h2>{{ node.title[0].value }}</h2>
    <ul>
      <li v-for="project in node.field_entity_reference">
        <project :nid="project.target_id" viewMode="teaser"></project>
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
    }
  },
  data () {
    return {
      node: {}
    }
  },
  created () {
    this.node = this.$store.state.nodes[this.nid]
  },
  components: {
    project
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .bworks_project_block {
    ul {
      list-style: none;
    }
  }
</style>
