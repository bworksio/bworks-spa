<template>
  <div :class="'node node-' + getType()" :style="nodeStyles">
    <div :if="hasVideo" class="bg-video">
      <video playsinline autoplay muted loop :poster="getField('field_header_image', 'url')">
        <!--source :src="getField('field_file', 'url')" type="video/webm"-->
        <source :src="getField('field_file', 'url')" type="video/mp4">
      </video>
    </div>
    <div class="container">
      <div class="intro-text-container">
        <div class="intro-text-wrapper">
          <h1><span>{{ getField('title') }}</span></h1>
          <div class="intro-text" v-html="getField('body')"></div>
        </div>
      </div>
      <div class="language-switcher-wrapper">
        <app-language-switcher></app-language-switcher>
      </div>
      <div class="continue"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import AppLanguageSwitcher from 'components/AppLanguageSwitcher'
  import ScrollMagic from 'scrollmagic'

  export default {
    name: 'bworks_basic_page',
    extends: Node,
    computed: {
      hasVideo () {
        return !!this.getField('field_file', 'url', 0, false)
      },
      nodeStyles () {
        let style = 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5))'
        if (!this.hasVideo) {
          style += ', url(' + this.getField('field_header_image', 'url') + ')'
        }
        return {
          'background-image': style
        }
      }
    },
    mounted () {
      // Invert the site header as long as this basic page is visible.
      new ScrollMagic.Scene({
        triggerElement: this.$el,
        triggerHook: 'onLeave',
        offset: -90
      })
        .duration(() => {
          return this.$el.clientHeight
        })
        .setClassToggle('#site-header', 'invert')
        .addTo(this.$store.state.scrollMagicMainController)
    },
    components: {
      AppLanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_basic_page {
    padding-top: 125px;
    background-position: center;
    background-size: cover;
    border-bottom: 8px solid $brand-primary;
    overflow: hidden;

    .intro-text-container {
      display: flex;
      #page.page-home & {
        align-items: flex-end;
        @include media-breakpoint-only(md) {
          align-items: center;
        }
      }
      #page:not(.page-home) & {
        align-items: center;
      }
      padding-bottom: 68px;

      @include media-breakpoint-only(xs) {
        min-height: 667px;
      }
      @include media-breakpoint-only(sm) {
        min-height: 375px;
        padding-bottom: 40px;
      }
      @include media-breakpoint-only(md) {
        min-height: 874px;
        align-items: center;
      }
      @include media-breakpoint-only(lg) {
        min-height: 618px;
      }
      @include media-breakpoint-only(xl) {
        min-height: 650px;
      }
      @include media-breakpoint-up(xxl) {
        min-height: 750px;
      }
    }

    .intro-text-wrapper {
      @include media-breakpoint-only(md) {
        padding-left: 8.3333333%;
        padding-right: 8.3333333%;
      }

      @include media-breakpoint-up(lg) {
        #page.page-home & {
          max-width: 55%;
        }

        #page:not(.page-home) & {
          display: flex;
          align-items: center;
        }
      }
    }

    h1, .h1 {
      font-size: 1.428571429rem;
      line-height: 1.35;
      letter-spacing: .0665em;

      #page.page-home & {
        text-shadow: 0 0 1px rgba(0,0,0,.3);
      }

      #page:not(.page-home) & {
        color: $white;

        span {
          display: block;
          max-width: 80%;
          border-bottom: 4px solid $white;

          @include media-breakpoint-down(sm) {
            border-bottom-width: 2px;
          }
        }
      }

      @include media-breakpoint-up(md) {
        font-size: 2rem;
        line-height: 1.357142857;
        letter-spacing: .066785714em;
      }

      @include media-breakpoint-up(lg) {
        #page:not(.page-home) & {
          flex: 1 50%;
        }
      }
    }

    .intro-text {
      p {
        margin-top: 2rem;
        font-size: 1rem;
        line-height: 1.285714286;
        letter-spacing: .115714286em;
        color: $white;

        @include media-breakpoint-only(md) {
          margin-top: 4rem;
        }

        #page.page-home & {
          font-weight: 900;
          line-height: 1.333333333;
          letter-spacing: .18em;
          margin-top: 0;

          @include media-breakpoint-up(md) {
            font-size: 1.428571429rem;
            line-height: 1.4;
            letter-spacing: .18em;
          }
          @include media-breakpoint-up(lg) {
            font-size: 1.928571429rem;
            line-height: 1.407407407;
            letter-spacing: .133333333em;
          }
        }

        #page:not(.page-home) & {
          @include media-breakpoint-up(md) {
            font-size: 1.285714286rem;
            line-height: 1.611111111;
            letter-spacing: .102777778em;
          }
        }

          // Overrule bold style
        b, strong {
          font-weight: 900;
        }
      }

      @include media-breakpoint-up(lg) {
        #page:not(.page-home) & {
          flex: 1 50%;
        }
      }
    }

    .language-switcher-wrapper {
      position: absolute;

      #page:not(.page-home) & {
        display: none;
      }

      @include media-breakpoint-down(sm) {
        display: none;
      }
      @include media-breakpoint-up(md) {
        right: 8.3333vw;
        bottom: 7.285714286rem;
      }
      @include media-breakpoint-up(lg) {
        bottom: 5.92857142rem;
      }
    }

    // Continuation marker
    .continue {
      position: relative;
      width: 2px;
      height: 4rem;
      overflow: hidden;
      margin: 0 auto;
      background-color: transparentize($white, .7);

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparentize($white, .1);
        animation: snake 3s infinite forwards;
      }

      @keyframes snake {
        0% {
          transform: translateY(-100%);
        }
        10% {
          transform: translateY(-100%);
        }
        40% {
          transform: translateY(0);
        }
        60% {
          transform: translateY(0);
        }
        90% {
          transform: translateY(100%);
        }
        100% {
          transform: translateY(100%);
        }
      }
    }
  }
</style>
