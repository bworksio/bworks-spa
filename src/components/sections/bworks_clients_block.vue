<template>
  <div class="node node-bworks_clients_block">
    <div class="container">
      <ul class="clients row">
        <li v-for="(node, index) in nodes" class="col-12 col-sm-6 col-md-4">
          <a href="#" :class="{active: index === active}" @click.prevent="show(index)">
            <drupal-image class="logo" :image="node.field_logo[0]"></drupal-image>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import DrupalImage from '@/components/elements/DrupalImage'
  const forEach = require('axios/lib/utils.js').forEach

  export default {
    name: 'bworks_clients_block',

    extends: Node,

    data () {
      return {
        nodes: [],
        active: 0
      }
    },

    created () {
      // Get referenced client nodes.
      forEach(this.node.field_entity_reference, ref => {
        this.nodes.push(this.$store.getters.getNode(ref.target_id, this.lang))
      })
    },

    methods: {
      show (index) {
        this.active = index
      }
    },

    components: {
      DrupalImage
    },

    i18n: {
      messages: {
        en: {
          what_they_say: 'What they say about us'
        },
        de: {
          what_they_say: 'Was man über uns sagt'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_clients_block {
    @include media-breakpoint-up(lg) {
      padding-left: 8.3333%;
      padding-right: 8.3333%;
    }

    .clients {
      a {
        position: relative;
        display: flex;
        height: 20vw;
        @include media-breakpoint-down(sm) {
          height: 150px;
        }
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        color: $white;
        text-align: center;
        text-transform: none;
        opacity: .4;
        transition: .4s;
        transition-property: opacity, background-color;

        .logo {
          display: block;
          max-width: 90%;
          height: auto;
          filter: grayscale(100%);
          transition: filter .2s;
        }

        .name {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 2rem 1rem 1rem;
        }

        &:focus,
        &:hover,
        &.active {
          opacity: 1;
          background-color: $brand-primary;

          .logo {
            filter: grayscale(100%) contrast(1000%) invert(100%);
          }
        }
      }
    }

    .quote {
      @include media-breakpoint-up(md) {
        max-width: 60%;
        margin-left: 20%;
      }
      margin-top: 3rem;
      margin-bottom: 4rem;
      min-height: 12rem;

      h3 {
        margin-bottom: 3rem;
        text-transform: none;
      }
    }
  }
</style>
