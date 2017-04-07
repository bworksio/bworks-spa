<template>
  <div :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <router-link class="unstyled" :to="projectUrl">
        <img :src="getField('field_image', 'url')">

        <template v-if="index === 0">
          <div class="description-wrapper">
            <h2>{{ getField('title') }}</h2>
              <div class="description">{{ getField('body', 'summary') }}</div>
              <div class="subtitle">{{ getField('field_subtitle') }}</div>
          </div>
          <div class="tags-wrapper">
            <ul>
              <li v-for="tag in getTags()">{{ tag }}</li>
            </ul>
          </div>
        </template>

        <template v-else>
          <div class="description-wrapper">
            <h2>{{ getField('title') }}</h2>
            <div class="tags-wrapper">
              <ul>
                <li v-for="tag in getTags()">{{ tag }}</li>
              </ul>
            </div>
          </div>
        </template>
      </router-link>
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
  import { cleanId } from '../../utils'

  export default {
    name: 'project',
    extends: Node,
    props: {
      // Index of item.
      index: {
        type: Number
      }
    },
    computed: {
      /**
       * Build url to specialties page.
       * @returns {string}
       */
      projectUrl () {
        const route = this.$router.options.getRouteByProps('works', this.lang)
        return route.path + '#' + this.cleanId
      }
    },
    created () {
      this.cleanId = cleanId(this.getField('title'))
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

        @include media-breakpoint-down(md) {
          .subtitle {
            display: none;
          }
        }

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
            padding-right: 4.1617%;
          }

          .description {
            flex: 1 50%;
            padding-right: 4.1617%;
          }

          .subtitle {
            margin-right: 8.3333%;
            padding-top: 4px;
            padding-right: 4.1617%;
            font-size: .857142rem;
            font-weight: $font-weight-bold;
            line-height: 1.16667;
            letter-spacing: .07167em;
            text-transform: uppercase;
            border-top: 1px solid $body-color;
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

        @include media-breakpoint-up(lg) {
          h2 {
            flex: 1 40%;
          }

          .description {
            flex: 1 40%;
          }

          .subtitle {
            display: block;
            flex: 1 12%;
          }
        }
      }

      &:not(:first-child) {
        @include media-breakpoint-up(lg) {
          .description-wrapper {
            display: flex;
          }

          h2 {
            flex-basis: 70%;
            padding-left: 25px;
            padding-right: 25px;
          }

          .tags-wrapper {
            flex-basis: 30%;
            text-align: right;
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
        font-size: .857142rem;
        font-weight: $font-weight-bold;
        line-height: 1.16667;
        letter-spacing: .044167em;
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
