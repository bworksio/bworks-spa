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
<script>
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_project_full from '@/components/nodes/bworks_project_full'
  import jQuery from 'jquery'
  import 'fullpage.js/dist/jquery.fullpage.css'
  export default {
    name: 'bworks_project_block_full',
    extends: Node,
    props: {
      viewMode: String
    },
    mounted () {
      require('script-loader!fullpage.js')
      // vm variable to use vue instance in jquery callback function
      const vm = this
      // Unwrap the project child components, i.e. remove this component's
      // wrapping div, so projects are on the same level as the other
      // fullpage sections
      const parent = this.$el.parentNode
      // Move all children out of this component
      while (this.$el.firstChild) parent.insertBefore(this.$el.firstChild, this.$el)
      /* global jQuery */
      jQuery('#page').fullpage({
        navigation: true,
        navigationPosition: 'right',
        onLeave: function(origin, destination, direction){
          const originProject = this[0].__vue__.node.title[0].value
          const destinationProject = direction === 'down'
            ? this.next()[0].__vue__.node.title[0].value
            : this.prev()[0].__vue__.node.title[0].value
          vm.$ga.event({
            eventCategory: 'Projects scrolling',
            eventAction: 'scroll',
            eventLabel: 'Scrolling event on projects page',
            eventValue: {
              originProject,
              destinationProject,
              direction
            }
          })
        },
      })
      // We can't use fullpage's anchor navigation, because hash changes trigger
      // a route change, which destroys and rerenders the page
      if (this.$route.params.project) {
        // Collect all project ids and manually move to the selected section
        // instead
        const anchors = Array.from(document.querySelectorAll('.section'))
          .map(el => el.getAttribute('data-id') || '')
        const index = anchors.indexOf(this.$route.params.project)
        if (index > 0) {
          jQuery.fn.fullpage.moveTo(index + 1)
        }
      }
    },
    beforeDestroy () {
      jQuery.fn.fullpage.destroy('all')
      // Move child components back in place, otherwise DOM patching would
      // ignore the moved nodes
      const sections = document.querySelectorAll('.section.node-bworks_project')
      Array.from(sections).map(el => this.$el.appendChild(el))
    },
    components: {
      bworks_project_full
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/mixins.scss';
  body {
    .fp-tableCell {
      vertical-align: bottom;
    }
    #fp-nav.right {
      right: 4.1617%;
      margin-top: 0 !important;
      transform: translateY(calc(-50% + 55px));
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