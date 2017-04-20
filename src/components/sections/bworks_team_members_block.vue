<template>
  <div class="node node-bworks_team_members_block">
    <div v-for="(teamMembers, title) in groups">
      <div class="container">
        <div class="row">
          <h3>{{ title }}</h3>
        </div>
      </div>
      <div class="members">
        <bworks_team_member v-for="teamMemberNode in teamMembers" :nid="teamMemberNode.nid[0].value" :lang="lang"></bworks_team_member>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { forEach } from '../../utils'
  import Node from '../helpers/Node'
  /* eslint-disable camelcase */
  import bworks_team_member from './bworks_team_member'

  export default {
    name: 'bworks_team_members_block',

    extends: Node,

    data () {
      return {
        nodes: [],
        groups: {}
      }
    },

    methods: {
      /**
       * Returns the group (tag) for a team member node.
       * @returns {string}
       */
      getGroup (node) {
        const id = node.field_function[0].target_id
        return id ? this.$store.getters.getTag(id, this.lang) : ''
      }
    },

    created () {
      // Get all team members
      this.nodes = this.$store.getters.getNodesByType('bworks_team_member', this.lang)

      forEach(this.nodes, node => {
        const group = this.getGroup(node)
        this.groups[group] = this.groups[group] || []
        this.groups[group].push(node)
      })
    },

    components: {
      bworks_team_member
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_team_members_block {
    .row {
      border-bottom: 1px solid $gray-bg;
    }

    h3 {
      color: $body-color;
      @include media-breakpoint-up(sm) {
        padding-left: 8.3333%;
        padding-right: 8.3333%;
      }
    }

    .members {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .node {
        width: 33.3333%;
        @include media-breakpoint-up(md) {
          width: 16.6667%;
        }
        margin-left: 7px;
        margin-right: 7px;
      }
    }
  }
</style>
