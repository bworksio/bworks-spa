<template>
  <div class="node node-bworks_clients_block">
    <div class="container">
      <ul class="clients row">
        <li v-for="(node, index) in nodes" class="col-6 col-sm-4">
          <a href="#" :class="{active: index === active}" @click.prevent="show(index)">
            <drupal-image class="logo" :image="node.field_logo[0]"></drupal-image>
            <div class="name">{{ node.title[0].value }}</div>
          </a>
        </li>
      </ul>

      <transition name="fade" mode="out-in">
        <div v-if="nodes[active]" :key="active" class="quote col-md-6 offset-md-3">
          <h3 class="h2">{{ $t('what_they_say') }}</h3>
          <div class="description" v-html="nodes[active].field_they_say_about_us[0].value"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../nodes/Node'
  import DrupalImage from '../elements/DrupalImage'
  import { forEach } from '../../utils'

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

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

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
            filter: grayscale(0%);
          }
        }
      }
    }

    .quote {
      margin-top: 4rem;
      margin-bottom: 4rem;
      min-height: 12rem;

      h3 {
        margin-bottom: 3rem;
        text-transform: none;
      }
    }
  }
</style>
