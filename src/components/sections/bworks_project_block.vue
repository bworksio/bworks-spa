<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <project v-for="(project, index) in node.field_entity_reference" :nid="project.target_id" :lang="lang" :first="index == 0" :viewMode="viewMode"></project>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import project from '../nodes/project'

  export default {
    name: 'bworks_project_block',
    extends: Node,
    props: {
      viewMode: String
    },
    components: {
      project
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
</style>
