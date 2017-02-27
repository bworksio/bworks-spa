<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <div class="container">
      <div class="row">
        <project v-for="(project, index) in node.field_entity_reference" :nid="project.target_id" :lang="lang" :index="index" :viewMode="viewMode"></project>
      </div>
      <div class="view-all">
        <a class="animated" href="#">View all projects</a>
      </div>
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

<style rel="stylesheet/scss" lang="scss">
  .node-bworks_project_block {
    .view-all {
      // FIXME Remove when projects overview page has been implemented
      display: none;

      text-align: center;
    }
  }
</style>
