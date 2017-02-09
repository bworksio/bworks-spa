<template>
  <div :class="'node node-' + node.type[0].target_id">
    <div class="container">
      <project v-for="(project, index) in node.field_entity_reference" :nid="project.target_id" :lang="lang" :first="index == 0" viewMode="teaser"></project>
    </div>
  </div>
</template>

<script type="text/javascript">
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
</style>
