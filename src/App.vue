<template>
  <div id="app">
    <header id="site-header" :data-show-menu="$store.state.showMenu ? 'yes' : ''">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo">
            <router-link class="logo" to="/" v-html="assets.bWorksLogo"></router-link>
          </div>
          <div class="menu-toggle">
            <app-menu-toggle></app-menu-toggle>
          </div>
          <div class="hire-us">
            <a class="hire-us animated" href="https://cosmobutler.typeform.com/to/t0B8ZJ">{{ $t('button.hire_us') }}</a>
          </div>
        </div>
      </div>
      <transition name="menu">
        <app-menu v-if="$store.state.showMenu"></app-menu>
      </transition>
    </header>

    <router-view></router-view>

    <transition name="fade">
      <div v-if="isLoading" id="preloading">
        <div v-html="assets.bWorksPreloading" class="logo"></div>
        <!--video playsinline autoplay poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" style="">
          <source src="static/Bworks-logoanimation.webm" type="video/webm">
          <source src="static/Bworks-logoanimation.mp4" type="video/mp4">
        </video-->
        <transition name="fade" appear>
          <div v-if="!error" class="loading delay">Loading</div>
        </transition>
        <transition name="fade">
          <div v-if="error" class="error">{{ error }}</div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import AppMenuToggle from 'components/AppMenuToggle'
  import AppMenu from './components/AppMenu'

  export default {
    name: 'App',

    data () {
      return {
        assets: {
          bWorksPreloading: require('!!raw!./assets/bworks-preloading.svg'),
          bWorksLogo: require('!!raw!./assets/bworks-logo.svg')
        }
      }
    },

    computed: {
      /** @var {Boolean} True while preloading data. */
      isLoading () {
        return !this.$store.state.initialized
      },

      /** @var {String} Returns the last error. */
      error () {
        return this.$store.state.error ? this.$store.state.error.toString() : ''
      }
    },

    created () {
      this.updateLanguage()
    },

    mounted () {
      // Emit trigger event for webpack prerender_spa_plugin
      /* global Event */
      window.setTimeout(() => {
        /* global Event */
        document.dispatchEvent(new Event('prerender'))
      }, 100)
    },

    watch: {
      '$route' (to, from) {
        this.updateLanguage()
      }
    },

    methods: {
      /**
       * Update global language in store from current route.
       */
      updateLanguage () {
        if (this.$route.matched.length && this.$route.matched[0].components.default.name !== 'NotFound') {
          const lang = this.$route.matched[0].props.default.lang
          this.$store.commit('setLanguage', lang)
          this.$i18n.locale = lang
        }
      }
    },

    components: {
      AppMenuToggle,
      AppMenu
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './assets/scss/main';

  #site-header {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 75px;
    padding: calc(2rem + 1vw) 0 0;
    background-color: $white;
    z-index: 990;
    transition: .2s;
    transition-property: background-color;

    a {
      color: $white;

      &.animated:after {
        background-color: $white;
      }
    }

    // Header wrapper container
    > .container {
      z-index: 991;
    }

    .header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      transform: translateY(-1.25rem);
      transition: .2s;
      transition-property: transform;

      > div {
        flex: 0 0 33.3333%;
        z-index: 991;
      }

      div.logo {
        a {
          display: block;
          width: 7rem;
          transform: scale(.715);
          transition: .2s;
          transition-property: color, transform;
        }

        svg {
          max-width: 100%;
        }

        .st0 {
          fill: $body-color;
          transition: fill .2s;
        }
      }

      div.menu-toggle {
        text-align: center;
      }

      div.hire-us {
        text-align: right;
      }

      a {
        color: $body-color;

        &.animated {
          @include hover-focus {
            color: $white;
          }

          &:after {
            background-color: $body-color;
          }

          @include media-breakpoint-down(sm) {
            &:after {
              display: none;
            }
          }
        }
      }

      a.hire-us {
        transform: translateX(0);
      }
    }

    // Invert link colors
    &.invert,
    &[data-show-menu=yes],
    html.fp-enabled & {
      background-color: transparent;
      background-image: linear-gradient(to bottom, transparentize(#222, .66), transparentize(#222, 1));

      .header-wrapper {
        transform: translateY(0);

        div.logo {
          a {
            @media (min-width: 346px) {
              transform: scale(1);
            }
          }

          .st0 {
            fill: $white;
          }
        }

        a {
          color: $white;

          &.animated {
            &:after {
              background-color: $white;
            }

            @include hover-focus {
              color: $body-color;
            }

            @include media-breakpoint-down(sm) {
              &:after {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  #preloading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 999;

    video {
      width: 100%;
      height: 100%;
    }

    .logo {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 250px;
      }
    }

    .loading,
    .error {
      position: absolute;
      top: 75%;
      width: 100%;
      text-align: center;
    }

    .loading:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4,end) 900ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0;
      margin-right: 1.25em;
    }

    @keyframes ellipsis {
      to {
        width: 1.25em;
        margin-right: 0;
      }
    }

    .error {
      color: red;
    }
  }
</style>
