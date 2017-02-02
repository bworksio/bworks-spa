<template>
  <div class="node" :class="node.type[0].target_id">
    <h2>{{ node.title[0].value }}</h2>
    <ul>
      <li v-for="specialty in node.field_entity_reference">
        <specialty :nid="specialty.target_id" viewMode="teaser"></specialty>
      </li>
    </ul>
  </div>
</template>

<script>
import specialty from '../nodes/speciality'

export default {
  name: 'bworks_speciality_block',
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
    specialty
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .bworks_speciality_block {
    ul {
      list-style: none;
    }
  }
</style>
