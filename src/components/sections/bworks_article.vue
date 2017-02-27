<template>
  <div :class="'node node-' + getType() + ' ' + viewMode">
    <div class="article container-fluid">
      <div class="row">
        <a class="unstyled" href="#">
          <div class="image col-md-7">
            <drupal-image :image="node.field_image[0]"></drupal-image>
          </div>
          <div class="body col-md-5">
            <h2 class="h1">{{ getField('title') }}</h2>
            <div v-html="getField('body')"></div>
            <div class="read-more">
              <a href="#">Read full story</a>
            </div>
          </div>
        </a>
      </div>

      <div class="view-all">
        <a class="animated" href="#">View all articles</a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_article',
    extends: Node,
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
          width: calc(110.4754% + 7.5px);
          margin-left: calc(-5.2377% - 7.5px);
          margin-right: calc(-5.2377% - 7.5px);
          margin-top: -4rem;
        }

        .h1 {
          margin-top: 3rem;
        }
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
