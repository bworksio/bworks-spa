<template>
  <div :class="'section node node-' + getType()" :style="getBackgroundStyle">
    <div v-if="hasVideo" class="bg-video">
      <video playsinline autoplay muted loop poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" :style="getVideoStyle">
        <!--source :src="getField('field_file', 'url')" type="video/webm"-->
        <source :src="getField('field_file', 'url')" type="video/mp4">
      </video>
    </div>
    <div class="container">
      <div class="intro-text-container">
        <div class="intro-text-wrapper">
          <h1><span>{{ getField('title') }}</span></h1>
          <div class="intro-text" v-html="getField('body', 'value', 0, '')"></div>
        </div>
      </div>
      <div class="language-switcher-wrapper">
        <language-switcher />
      </div>
      <div class="continue"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../nodes/Node'
  import LanguageSwitcher from '../elements/LanguageSwitcher'
  import ScrollMagic from 'scrollmagic'

  /** @var {ScrollMagic.Scene} smHeaderInvertScene */
  let smHeaderInvertScene

  export default {
    name: 'bworks_basic_page',
    extends: Node,

    computed: {
      hasVideo () {
        return !!this.getField('field_file', 'url', 0, false)
      },

      getBackgroundStyle () {
        let style = 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5))'
        if (!this.hasVideo) {
          style += ', url(' + this.getField('field_header_image', 'url', 0, '') + ')'
        }
        return {
          'background-image': style
        }
      },

      getVideoStyle () {
        return {
          'background-image': 'url(' + this.getField('field_header_image', 'url', 0, '') + ')',
          'background-size': 'cover'
        }
      }
    },

    mounted () {
      // Invert the site header as long as this basic page is visible.
      if (!this.$store.state.isPhantom) {
        smHeaderInvertScene = new ScrollMagic.Scene({
          triggerElement: this.$el,
          triggerHook: 'onLeave',
          offset: -90
        })
          .duration(() => {
            return this.$el.clientHeight
          })
          .setClassToggle('#site-header', 'invert')
          .addTo(this.$store.state.scrollMagicMainController)
      }
    },

    beforeDestroy () {
      // Also destroy ScrollMagic scene.
      if (smHeaderInvertScene) {
        smHeaderInvertScene.destroy(true)
      }
    },

    components: {
      LanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_basic_page {
    position: relative;
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
      min-height: calc(100vh - 189px);
      padding-bottom: 68px;

      @include media-breakpoint-only(sm) {
        padding-bottom: 40px;
      }
      @include media-breakpoint-only(md) {
        align-items: center;
      }
    }

    .intro-text-wrapper {
      width: 100%;

      @include media-breakpoint-only(md) {
        padding-left: 8.3333%;
        padding-right: 8.3333%;
      }

      @include media-breakpoint-up(lg) {
        #page.page-home & {
          max-width: 55%;
        }

        #page:not(.page-home) & {
          display: flex;
          align-items: center;
          width: 100%;
        }
      }
    }

    h1, .h1 {
      font-size: 1.42857rem;
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
        line-height: 1.35714;
        letter-spacing: .06678em;
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
        line-height: 1.28571;
        letter-spacing: .11571em;
        color: $white;

        @include media-breakpoint-only(md) {
          margin-top: 4rem;
        }

        #page.page-home & {
          font-weight: 900;
          line-height: 1.33333;
          letter-spacing: .18em;
          margin-top: 0;

          @include media-breakpoint-up(md) {
            font-size: 1.42857rem;
            line-height: 1.4;
            letter-spacing: .18em;
          }
          @include media-breakpoint-up(lg) {
            font-size: 1.92857rem;
            line-height: 1.40740;
            letter-spacing: .13333em;
          }
        }

        #page:not(.page-home) & {
          @include media-breakpoint-up(md) {
            font-size: 1.28571rem;
            line-height: 1.61111;
            letter-spacing: .10278em;
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
          padding-left: 8.3333%;
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
        bottom: 7.28571rem;
      }
      @include media-breakpoint-up(lg) {
        bottom: 5.9285rem;
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
