<template>
  <div :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <a class="unstyled" href="#">
        <img :src="getField('field_image', 'url')">

        <template v-if="index === 0">
          <div class="description-wrapper">
            <h2>{{ getField('title') }}</h2>
            <div class="description">{{ getField('body', 'summary') }}</div>
          </div>
        </template>

        <template v-else>
          <h2>{{ getField('title') }}</h2>
        </template>

        <div class="tags-wrapper">
          <ul>
            <li v-for="tag in getTags()">{{ tag }}</li>
          </ul>
        </div>
      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <img :src="getField('field_image', 'url')">
      <h2>{{ getField('title') }}</h2>
      <div v-html="getField('body', 'value')"></div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  export default {
    name: 'project',
    extends: Node,
    props: {
      // Index of item.
      index: {
        type: Number
      }
    },
    methods: {
      getTags () {
        const tags = []
        this.getAllFields('field_project_tags').forEach((value) => {
          tags.push(this.$store.getters.getTag(value.target_id, this.lang))
        })
        return tags
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_project {
    position: relative;
    margin-bottom: 30px;

    a {
      // FIXME Remove when project page has been implemented
      pointer-events: none;

      display: block;
      position: relative;
    }

    img {
      width: 100%;
      height: auto;
    }

    &.teaser {
      .description {
        display: none;
      }

      @include media-breakpoint-up(md) {
        @include make-gutters();
        width: 50%;

        .description {
          display: block;
        }
      }

      &:first-child {
        width: 100%;
        padding-top: 2rem;

        @include media-breakpoint-up(md) {
          .description-wrapper {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 6rem;
            background-color: rgba(255,255,255,.75);
          }

          h2 {
            flex: 1 50%;
            padding-left: 8.3333%;
          }

          .description {
            flex: 1 50%;
          }

          .tags-wrapper {
            position: absolute;
            top: -3rem;
            right: 0;
            padding: 2rem 4rem 2rem 3rem;
            color: $white;
            background-color: transparentize($brand-primary, .1);
          }
        }
      }

      img {
        max-height: 640px;
        object-fit: cover;
      }

      h2 {
        margin: .3em 0 .15em;
        color: $body-color;
      }

      .description {
        max-height: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tags-wrapper {
        margin: 1rem 0 2rem;
        font-weight: 700;
        letter-spacing: .080714286em;
        text-transform: uppercase;

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
</style>
