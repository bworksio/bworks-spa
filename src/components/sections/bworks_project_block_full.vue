<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <bworks_project_full
      v-for="(project, index) in node.field_entity_reference"
      :nid="project.target_id"
      :lang="lang"
      :index="index"
      :viewMode="viewMode"
      :key="project.target_id + '-' + lang" />
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_project_full from '@/components/nodes/bworks_project_full'
  import 'fullpage.js'
  import 'fullpage.js/dist/jquery.fullpage.css'

  export default {
    name: 'bworks_project_block_full',
    extends: Node,
    props: {
      viewMode: String
    },
    mounted () {
      // Unwrap the project child components, i.e. remove this component's
      // wrapping div, so projects are on the same level as the other
      // fullpage sections
      const parent = this.$el.parentNode
      // Move all children out of this component
      while (this.$el.firstChild) parent.insertBefore(this.$el.firstChild, this.$el)
      // Remove the empty element
      parent.removeChild(this.$el)

      /* global jQuery */
      jQuery('#page').fullpage({
        navigation: true,
        navigationPosition: 'right'
      })

      // We can't use fullpage's anchor navigation, because hash changes trigger
      // a route change, which destroys and rerenders the page
      if (this.$route.params.project) {
        // Collect all project ids and manually move to the selected section
        // instead
        const anchors = Array.from(document.querySelectorAll('.section'))
          .map(el => el.getAttribute('data-id') || '')
        const index = anchors.indexOf(this.$route.params.project)
        if (index !== -1) {
          jQuery.fn.fullpage.moveTo(index)
        }
      }
    },
    beforeDestroy () {
      jQuery.fn.fullpage.destroy('all')
    },
    components: {
      bworks_project_full
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins.scss';

  body {
    .fp-tableCell {
      vertical-align: bottom;
    }

    #fp-nav.right {
      right: 4.1617%;

      ul li {
        width: 27px;
        height: 9px;
        margin: 0 0 4rem;

        a,
        a.active {
          span {
            left: 0;
            top: -9px;
            width: 9px;
            height: 9px;
            margin: 9px;
            background-color: $white;
            border-radius: 0;
          }
        }

        &:hover a span,
        & a.active span {
          transform: scale(1.8889);
          border-radius: 0;
        }

        &:not(:last-of-type):after {
          display: block;
          content: "";
          position: absolute;
          width: 1px;
          height: 4rem;
          margin: 0 0 0 13px;
          background-color: $white;
        }
      }
    }
  }
</style>
