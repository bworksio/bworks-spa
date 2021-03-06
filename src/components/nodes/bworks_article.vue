<template>
  <div :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <div class="article container-fluid">
        <router-link class="unstyled row" :to="getPath()">
          <div class="image col-md-7 col-lg-6">
            <drupal-image :image="node.field_image[0]"></drupal-image>
          </div>
          <div class="body col-md-5 col-lg-6">
            <h2>{{ getField('title') }}</h2>
            <div class="summary" v-html="getField('body', 'summary')"></div>
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
          <div class="category">{{ getTag() }}</div>
          <h2 class="h3">{{ getField('title') }}</h2>
          <div class="date">{{ getField('field_date') }}</div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import DrupalImage from '@/components/elements/DrupalImage'

  export default {
    name: 'bworks_article',

    extends: Node,

    methods: {
      /**
       * Returns the current node's url alias.
       * @returns {string}
       */
      getPath () {

        // Use "props" parentType for adding language prefix only to blog, for "other" prefix was not used.
        const alias = this.node.hasOwnProperty('path') && this.node.path.length ? this.node.path[0].alias : '';
        const path = this.lang === 'en' ? '/en' + alias : alias;
        return path;
      },

      /**
       * Returns the (first) tag for the current node.
       * @returns {string}
       */
      getTag () {
        const id = this.getField('field_tags', 'target_id', 0, false)
        return id ? this.$store.getters.getTag(id, this.lang) : this.$t('message.blog')
      }
    },

    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    },

    components: {
      'drupal-image': DrupalImage
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

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
      margin-top: 2.14285rem;

      .article {
        padding-top: 4rem;
        padding-bottom: 5rem;
        background-color: $gray-bg;
      }

      h2 {
        font-size: 1.42857rem;
      }

      .summary {
        font-size: 1.14285rem;
      }

      @include media-breakpoint-down(sm) {
        .article {
          padding-top: 2.14285rem;
          padding-bottom: 2.14285rem;
        }

        .image {
          width: calc(100% + 16.6677vw);
          margin-left: calc(55% - 50vw);
          margin-right: calc(55% - 50vw);
          margin-top: -2.14285rem;
          padding: 0;
        }

        h2 {
          margin-top: 3rem;
        }
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
        max-height: 15rem;
        min-height: 15rem;
      }

      .category {
        color: $gray-color;
        margin-top: 1em;
        padding-top: .5em;
        border-top: 1px solid $gray-color;
      }

      h2 {
        margin: .25em 0 .5em;
        line-height: 1.6667rem;
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
