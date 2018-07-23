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

<script>
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_speciality from '@/components/nodes/bworks_speciality'

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

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_speciality_block {
    padding-top: 2rem;
  }
</style>
