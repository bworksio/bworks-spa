<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <div class="container">
      <div class="row">
        <project v-for="(project, index) in node.field_entity_reference" :nid="project.target_id" :lang="lang" :index="index" :viewMode="viewMode"></project>
      </div>
      <div class="view-all">
        <router-link class="animated" :to="$router.options.getRouteByProps('works', lang)">{{ $t('button.view_all_projects') }}</router-link>
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
      text-align: center;
    }
  }
</style>
