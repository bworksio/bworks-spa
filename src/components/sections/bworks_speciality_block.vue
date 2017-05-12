<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <ul class="row">
        <li v-for="specialty in node.field_entity_reference" :class="liClasses">
          <bworks_speciality :nid="specialty.target_id" :lang="lang" :viewMode="viewMode"></bworks_speciality>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable camelcase */
  import Node from '../helpers/Node'
  import bworks_speciality from '../nodes/bworks_speciality'

  export default {
    name: 'bworks_speciality_block',
    extends: Node,
    props: {
      viewMode: String
    },
    computed: {
      liClasses () {
        return this.viewMode === 'full' ? 'col-md-6' : 'col-md-6 col-lg-3'
      }
    },
    components: {
      bworks_speciality
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';
</style>
