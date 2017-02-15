<template>
  <div :class="'node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <a class="unstyled" href="#">
        <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
        <h3>{{ getField('title') }}</h3>
      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <inline-svg :url="getField('field_logo', 'url')"></inline-svg>
      <h2>{{ getField('title') }}</h2>
      <div v-html="getField('body', 'value', 0, '')"></div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import svg from 'components/helpers/Svg'

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
    components: {
      'inline-svg': svg
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_speciality {
    a {
      display: block;

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

    h3 {
      font-size: .857142857rem;
      line-height: 1.333333333;
      letter-spacing: .083333333em;
      margin-top: .5em;
      margin-bottom: .5em;
    }

    @include media-breakpoint-down(md) {
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

    @include media-breakpoint-up(lg) {
      text-align: center;

      svg {
        width: 15vw;
        height: auto;
      }
    }
  }
</style>
