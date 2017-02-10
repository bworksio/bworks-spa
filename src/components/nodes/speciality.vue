<template>
  <div :class="'node-' + node.type[0].target_id + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <a href="#">
        <inline-svg :url="node.field_logo[0].url"></inline-svg>
        <h3>{{ node.title[0].value }}</h3>
      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <inline-svg :url="node.field_logo[0].url"></inline-svg>
      <h2>{{ node.title[0].value }}</h2>
      <div v-html="node.body[0].value"></div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import svg from 'components/helpers/Svg'

  export default {
    name: 'speciality',
    props: {
      // Node id of the project
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      },
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
      }
    },
    data () {
      return {
        node: {}
      }
    },
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    },
    components: {
      'inline-svg': svg
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_speciality {
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

    h3 {
      font-size: .857142857rem;
      line-height: 1.333333333;
      letter-spacing: .083333333em;
      margin-top: .5em;
      margin-bottom: .5em;
    }
  }
</style>
