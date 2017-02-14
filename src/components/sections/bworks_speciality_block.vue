<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <ul class="row">
        <li v-for="specialty in node.field_entity_reference" class="col-md-6 col-lg-3">
          <speciality :nid="specialty.target_id" :lang="lang" viewMode="teaser"></speciality>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import speciality from '../nodes/speciality'

  export default {
    name: 'bworks_speciality_block',
    extends: Node,
    components: {
      speciality
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_speciality_block {
    ul {
      padding: 0;
      list-style: none;

      li {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }
  }
</style>
