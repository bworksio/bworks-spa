<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <div class="container">
      <div class="row">
        <bworks_project_teaser
          v-for="(project, index) in node.field_entity_reference"
          :nid="project.target_id"
          :lang="lang"
          :index="index"
          :viewMode="viewMode"
          :key="project.target_id + '-' + lang" />
      </div>
      <div class="view-all">
        <router-link class="animated" :to="$router.options.getRouteByProps('works', lang)">{{ $t('button.view_all_projects') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_project_teaser from '@/components/nodes/bworks_project_teaser'

  export default {
    name: 'bworks_project_block_teaser',
    extends: Node,
    props: {
      viewMode: String
    },
    components: {
      bworks_project_teaser
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/mixins.scss';

  .node-bworks_project_block {
    .view-all {
      text-align: center;
    }
  }
</style>
