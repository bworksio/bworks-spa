<template>
  <div class="node node-bworks_careers_block">
    <div class="container">
      <ul class="row">
        <li v-for="(node, index) in nodes" class="col-sm-6">
          <a href="#" :class="{active: index === active}" @click.prevent="show(index)">{{ node.title[0].value }}</a>
        </li>
      </ul>

      <transition name="fade" mode="out-in">
        <div v-if="nodes[active]" :key="active" class="job-offer">
          <h3 class="h2">Looking for</h3>
          <h2 class="h1">{{ nodes[active].title[0].value }}</h2>
          <div v-html="nodes[active].body[0].value"></div>
          <div class="apply">
            <a class="animated" :href="nodes[active].field_link[0].uri">Apply</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'

  export default {
    name: 'bworks_careers_block',
    extends: Node,
    data () {
      return {
        nodes: [],
        active: 0
      }
    },
    created () {
      // Get all articles
      this.nodes = this.$store.getters.getNodesByType('bworks_job_offer', this.lang)
    },
    methods: {
      show (index) {
        this.active = index
      }
    },
    components: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_careers_block {
    ul {
      padding: 0;
      list-style: none;

      a {
        display: inline-block;
        width: 85%;
        margin-bottom: 1rem;
        padding-top: .5em;
        border-top: 1px solid $body-color;
        font-weight: 400;
        color: $body-color;

        &:after {
          content: "•";
          position: absolute;
          right: calc(15% + 1rem);
          color: transparent;
          transition: transform .4s;
        }

        &.active:after {
          color: $brand-primary;
          transform: scale(2);
        }

        @include hover-focus {
          color: $brand-primary;

          &:after {
            color: $brand-primary;
            transform: scale(2);
          }
        }
      }
    }

    .job-offer {
      margin-top: 6rem;

      .apply {
        margin-top: 4rem;
        text-align: center;
      }
    }
  }
</style>
