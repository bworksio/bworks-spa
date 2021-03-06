<template>
  <div :id="cleanId" :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'list'">
      <router-link class="unstyled" :to="pageUrl">
        <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
        <h3>{{ getField('title') }}</h3>
      </router-link>
    </template>

    <template v-if="viewMode === 'teaser'">
      <router-link class="unstyled" :to="teaserUrl">
        <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
        <h3>{{ getField('title') }}</h3>
      </router-link>
    </template>

    <template v-if="viewMode === 'full'">
      <template v-if="pageUrl">
        <router-link class="unstyled" :to="pageUrl">
          <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
          <div class="text">
            <h3>{{ getField('title') }}</h3>
            <div v-html="getField('body', 'value', 0, '')"></div>
          </div>
        </router-link>
      </template>
      <template v-else>
        <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
        <div class="text">
          <h3>{{ getField('title') }}</h3>
          <div v-html="getField('body', 'value', 0, '')"></div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import svg from '@/components/elements/Svg'
  import jump from 'jump.js'

  export default {
    name: 'bworks_speciality',

    extends: Node,

    props: {
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
      }
    },

    computed: {
      cleanId () {
        return this.getCleanId(this.getField('title'))
      },

      /**
       * Get url to specialties page
       *
       * Returns either a linked spa page, or a link to the specialties page
       * including fragment.
       *
       * @returns {string}
       */
      teaserUrl () {
        if (this.pageUrl) {
          return this.pageUrl
        }
        const route = this.$store.getters.getPathByQueue('specialities', this.lang)
        return route ? route + '#' + this.cleanId : ''
      },

      /**
       * Get url to individual speciality page (set in field_content_map_link).
       * @returns {string}
       */
      pageUrl () {
        const link = this.getField('field_content_map_link', 'value', 0, false)
        if (link) {
          return this.$store.getters.getPathByQueue(link, this.lang) || ''
        }
        return ''
      }
    },

    mounted () {
      // Check if there is a hash in the url, and if it matches the component,
      // then scroll to it when mounted
      if (window.location.hash && window.location.hash === '#' + this.cleanId) {
        jump(window.location.hash, { offset: -125 })
      }
    },

    components: {
      'inline-svg': svg
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_speciality {
    svg {
      [id^="Oval"] {
        stroke: #eaeaea;
        stroke-width: 1px;
        fill: transparent;
        transition: fill .4s ease;
      }

      #Shape {
        fill: $brand-primary;
        transition: fill .4s ease;
      }
    }

    a {
      @include hover-focus {
        svg {
          [id^="Oval"] {
            stroke: #eaeaea;
            fill: $brand-primary;
          }

          #Shape {
            fill: $white;
          }
        }
      }
    }

    &.teaser {
      h3 {
        font-size: 1.28571rem;
        line-height: 1.38889;
        letter-spacing: .06667em;
        margin-top: .5em;
        margin-bottom: .5em;

        .page-home & {
          font-size: 1.14285rem;
          line-height: 1.375;
          letter-spacing: .083125em;
        }
      }
    }

    @include media-breakpoint-down(md) {
      &.teaser {
        a {
          display: flex;
          align-items: center;
        }

        svg {
          width: 15vw;
          height: 100%;
        }

        h3 {
          margin-left: calc(33.68px - 1vw);
        }
      }
    }

    @include media-breakpoint-up(lg) {
      &.teaser {
        text-align: center;

        svg {
          width: 15vw;
          height: 100%;
        }
      }
    }

    &.full {
      display: flex;

      > a {
        display: flex;
      }

      .icon {
        flex: 1 30%;
        width: 8.33333vw;
        padding-right: 8.33333%;
      }

      svg {
        width: 100%;
        max-width: 100%;
        height: auto;
      }

      .text {
        flex: 1 70%;
        padding-right: 4.166665%;
      }

      h3 {
        margin-bottom: 1.5rem;
      }
    }

    &.list {
      > a {
        text-align: center;

        @include hover-focus {
          h3 {
            color: $body-color;
          }
        }
      }

      h3 {
        margin-top: 2rem;
        color: $gray-color;
      }
    }
  }
</style>
