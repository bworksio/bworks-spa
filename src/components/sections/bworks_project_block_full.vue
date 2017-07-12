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
  import jQuery from 'jquery'
  import 'fullpage.js'
  import 'fullpage.js/dist/jquery.fullpage.css'

  export default {
    name: 'bworks_project_block_full',
    extends: Node,
    props: {
      viewMode: String
    },
    mounted () {
      // Unwrap .node-bworks_project elements (i.e., remove this components
      // wrapper div)
      const $projects = jQuery('.node-bworks_project')
      if ($projects.parent().is('.node-bworks_project_block')) {
        $projects.unwrap()
      }

      // Attach fullpage.js
      let anchors = document.querySelectorAll('#page .section')
      anchors = Array.from(anchors)
        .map((el, idx) => el.getAttribute('data-id') ? el.getAttribute('data-id') : '' + idx)
      jQuery('#page').fullpage({
        anchors,
        navigation: true,
        navigationPosition: 'right'
      })
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

    #fp-nav {
      position: fixed;
      right: 4.1617%;
      top: 50%;

      ul li {
        width: 17px;
        height: 9px;
        margin: 0 0 4rem;

        a {
          height: auto;
          width: auto;

          span {
            left: auto;
            top: auto;
            width: 9px;
            height: 9px;
            margin: 0; //-4px 0 0 -3px;
            transform: translateX(-50%);
            background-color: $white;
            border-radius: 0;
          }

          &.active span {
            width: 17px;
            height: 17px;
            margin: 0; //-11px 0 0 -8px;
            border-radius: 0;
          }
        }

        &:not(:last-of-type):after {
          display: block;
          content: "";
          position: absolute;
          width: 1px;
          height: 4rem;
          transform: translateY(9px);
          background-color: $white;
        }
      }
    }
  }
</style>
