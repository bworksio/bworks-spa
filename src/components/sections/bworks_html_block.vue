<template>
  <div :class="'node node-' + getType()">
    <div class="container" v-html="getField('body')"></div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import ScrollMagicMixin from '@/components/mixins/ScrollMagicMixin'

  export default {
    name: 'bworks_html_block',

    extends: Node,
    mixins: [ScrollMagicMixin],

    mounted () {
      const ScrollMagicScene = require('scrollmagic').Scene
      Array.from(this.$el.querySelectorAll('.animation-wrapper')).forEach((el) => {
        // Run html animations on enter.
        const options = {
          triggerElement: el,
          triggerHook: 'onEnter',
          offset: 25,
          reverse: false
        }
        this.addScrollMagicScene(new ScrollMagicScene(options))
          .setClassToggle(el, 'run')
      })
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .html-wrapper {
    @include media-breakpoint-down(sm) {
      .h2 {
        margin-bottom: 0;
      }
    }

    h1 {
      margin-bottom: 0;
    }

    .body {
      margin-top: 2.14285rem;
    }
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
        margin-top: 2.14285rem;
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

        @include media-breakpoint-up(lg) {
          padding-left: 8.3333%;
          padding-right: 8.3333%;
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
        margin-top: -10px;

        .animation-wrapper:first-of-type {
          display: inline-block;
          vertical-align: -2px;
        }

        .line {
          float: right;
        }
      }

      .body {
        width: 100%;
      }
    }

    @include media-breakpoint-up(md) {
      // Narrow templates
      &.intro-sub,
      &.simple {
        .html-wrapper {
          padding-left: 8.33333%;
          padding-right: 8.33333%;
        }
      }
    }

    .image {
      margin-bottom: 2rem;
      @include media-breakpoint-up(md) {
        margin-bottom: 4rem;
      }

      img {
        width: 100%;
        max-width: 100%;
        height: auto;
      }
    }

    .line {
      width: 8.33333vw;
      height: 1px;
      background-color: $body-color;
      margin-bottom: .42857rem;
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
    .animation-wrapper:first-of-type {
      overflow: hidden;
    }

    .line.animated {
      transition-delay: .1s;
    }

    h4.promo {
      font-size: 1rem;
      line-height: 1.28571;
    }
  }

  // Headline #2 & promos
  .headline-wrapper {
    .headline:nth-child(2) {
      .animated {
        transition-delay: .05s;
      }
    }
  }
  .promo-wrapper {
    .promo.animated {
      transition-delay: .15s;
    }
  }
</style>
