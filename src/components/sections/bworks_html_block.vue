<template>
  <div :class="'node node-' + getType()">
    <div class="container" v-html="getField('body')"></div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import ScrollMagic from 'scrollmagic'

  export default {
    name: 'bworks_html_block',
    extends: Node,
    mounted () {
      // Run html animations on enter.
      new ScrollMagic.Scene({
        triggerElement: this.$el,
        triggerHook: 'onEnter',
        reverse: false
      })
        .setClassToggle(this.$el, 'run')
        .addTo(this.$store.state.scrollMagicMainController)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_html_block {
    padding-top: 4rem;
  }

  // Ckeditor templates
  .html-container {
    &.intro {
      display: flex;
      flex-wrap: wrap;

      .html-wrapper {
        @include media-breakpoint-up(md) {
          flex: 1 50%;
        }
        @include media-breakpoint-up(lg) {
          flex: 1 60%;
        }
        @include media-breakpoint-up(xl) {
          flex: 1 40%;
        }
      }

      .promo-container {
        @include media-breakpoint-down(sm) {
          display: none;
        }
        @include media-breakpoint-up(md) {
          flex: 1 20%;
          margin-left: 30%;
        }
        @include media-breakpoint-up(lg) {
          margin-left: 20%;
        }
        @include media-breakpoint-up(xl) {
          flex: 1 50%;
          margin-left: 10%;

          display: flex;
          justify-content: space-between;
        }
      }

      .promo-wrapper {
        @include media-breakpoint-down(lg) {
          &:nth-child(2) {
            margin-top: 4rem;
          }
        }

        @include media-breakpoint-up(xl) {
          &:nth-child(2) {
            padding-left: 20%;
          }
        }
      }

      footer {
        width: 100%;
        margin-top: 2.142857143rem;
        @include media-breakpoint-up(sm) {
          margin-top: 4rem;
        }

        .body {
          text-align: center;
        }
      }
    }

    &:not(.intro) {
      .html-wrapper {
        display: flex;
        flex-wrap: wrap;

        @include media-breakpoint-up(md) {
          padding-left: 8.33333%;
          padding-right: 8.33333%;
        }
      }

      .image-wrapper {
        width: 100%;
      }

      .headline-wrapper {
        flex: 1 75%;
      }

      .promo-container {
        @include media-breakpoint-down(sm) {
          display: none;
        }
        flex: 1 25%;
        text-align: right;

        .line {
          float: right;
        }
      }

      .body {
        width: 100%;
      }
    }

    .line {
      width: 8.333333333vw;
      height: 1px;
      background-color: $body-color;
      margin-bottom: .428571429rem;
    }
  }

  // Animations
  // Headline #1
  .headline-wrapper {
    .headline:nth-child(2) {
      .animated {
        transition-delay: 0s;
      }
    }
  }

  // Promo lines
  .promo-wrapper {
    .line.animated {
      transition-delay: .3s;
    }
  }

  // Headline #2 & promos
  .headline-wrapper {
    .headline:nth-child(2) {
      .animated {
        transition-delay: .6s;
      }
    }
  }
  .promo-wrapper {
    .promo.animated {
      transition-delay: .6s;
    }
  }
</style>
