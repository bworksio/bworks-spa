<template>
  <div :id="cleanId" :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <router-link class="unstyled" :to="teaserUrl">
        <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
        <h3>{{ getField('title') }}</h3>
      </router-link>
    </template>

    <template v-if="viewMode === 'full'">
      <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
      <div class="text">
        <h3>{{ getField('title') }}</h3>
        <div v-html="getField('body', 'value', 0, '')"></div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import svg from 'components/helpers/Svg'
  import jump from 'jump.js'
  import { cleanId } from '../../utils'

  export default {
    name: 'speciality',
    extends: Node,
    props: {
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
      }
    },
    data () {
      return {
        cleanId: ''
      }
    },
    computed: {
      /**
       * Build url to specialties page.
       * @returns {string}
       */
      teaserUrl () {
        const route = this.$router.options.getRouteByProps('specialities', this.lang)
        return route.path + '#' + this.cleanId
      }
    },
    created () {
      this.cleanId = cleanId(this.getField('title'))
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

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

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
      display: block;

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
          height: auto;
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
          height: auto;
        }
      }
    }

    &.full {
      display: flex;

      .icon {
        flex: 1 30%;
        width: 8.33333%;
        padding-right: 8.33333%;
      }

      svg {
        width: 100%;
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
  }
</style>
