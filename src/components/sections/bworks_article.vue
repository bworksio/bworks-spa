<template>
  <div :class="getNodeClass">
    <template v-if="viewMode === 'teaser'">
      <div class="article container-fluid">
        <router-link class="unstyled row" :to="getPath()">
          <div class="image col-md-7 col-lg-6">
            <drupal-image :image="node.field_image[0]"></drupal-image>
          </div>
          <div class="body col-md-5 col-lg-6">
            <h2>{{ getField('title') }}</h2>
            <div v-html="getField('body', 'summary')"></div>
            <div class="read-more">
              <router-link :to="getPath()">{{ $t('button.read_full_story') }}</router-link>
            </div>
          </div>
        </router-link>

        <div class="view-all">
          <router-link class="animated" to="blog">{{ $t('button.view_all_articles') }}</router-link>
        </div>
      </div>
    </template>

    <template v-if="viewMode === 'list'">
      <router-link :to="getPath()">
        <div class="image">
          <drupal-image :image="node.field_image[0]"></drupal-image>
        </div>
        <div class="body">
          <h2 class="h3">{{ getField('title') }}</h2>
          <div class="date">{{ getField('field_date') }}</div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_article',
    extends: Node,
    computed: {
      getNodeClass () {
        const classes = [
          'node',
          'node-' + this.getType(),
          this.viewMode
        ]
        if (this.viewMode === 'list') {
          classes.push('col-sm-6 col-md-4')
        }
        return classes
      }
    },
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

    .date {
      font-weight: 400;
      color: $gray-color;
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

        h2 {
          margin-top: 3rem;
        }
      }

      .row {
        //align-items: center;
      }

      .h1 {
        color: $body-color;
      }

      .read-more {
        margin-top: 2rem;
        text-align: right;

        a {
          color: $gray-color;
          @include hover-focus {
            color: $body-color;
          }
        }
      }

      .view-all {
        margin-top: 4rem;
        text-align: center;

        a {
          color: $gray-color;
          @include hover-focus {
            color: $body-color;
          }

          @include hover-focus {
            color: $white;
          }
          &:after {
            background-color: $gray-color;
          }
        }
      }
    }

    &.list {
      img {
        object-fit: cover;
        object-position: center;
        max-height: 12rem;
        min-height: 12rem;
      }

      h2 {
        margin: 1em 0 .5em;
        text-transform: none;
        transition: color .4s;
      }

      &:not(:hover) {
        h2 {
          color: $body-color;
        }
      }
    }
  }
</style>
