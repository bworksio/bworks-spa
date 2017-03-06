<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <div class="article container-fluid">
        <div class="row">
          <div class="image col-md-7 col-lg-6">
            <drupal-image :image="node.field_image[0]"></drupal-image>
          </div>
          <div class="body col-md-5 col-lg-6">
            <h2 class="h1">{{ getField('title') }}</h2>
            <div v-html="getField('body', 'summary')"></div>
            <div class="read-more">
              <router-link :to="getPath()">Read full story</router-link>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link class="animated" to="blog">View all articles</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_article',
    extends: Node,
    methods: {
      getPath () {
        return this.node.path.length ? this.node.path[0].alias : ''
      }
    },
    // Component lifecycle hooks
    created () {
      this.node = this.$store.getters.getNode(this.nid, 'en')
    },
    components: {
      'drupal-image': DrupalImage
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_article {
    img {
      max-width: 100%;
      height: auto;
    }

    &.teaser {
      padding-top: 4rem;

      .article {
        padding-top: 4rem;
        padding-bottom: 5rem;
        background-color: $gray-bg;
      }

      @include media-breakpoint-down(sm) {
        .article {
          padding-top: 4rem;
        }

        .image {
          width: calc(100% + 16.6677vw);
          margin-left: calc(55% - 50vw);
          margin-right: calc(55% - 50vw);
          margin-top: -4rem;
          padding: 0;
        }

        .h1 {
          margin-top: 3rem;
        }
      }

      .row {
        align-items: center;
      }

      .h1 {
        color: $body-color;
      }

      .read-more {
        margin-top: 2rem;
        text-align: right;
      }

      a {
        color: $gray-color;
        @include hover-focus {
          color: $body-color;
        }

        &.animated {
          @include hover-focus {
            color: $white;
          }
          &:after {
            background-color: $gray-color;
          }
        }
      }

      .view-all {
        margin-top: 4rem;
        text-align: center;
      }
    }
  }
</style>
