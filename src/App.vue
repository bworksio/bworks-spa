<template>
  <div id="app">
    <header id="site-header" :data-show-menu="$store.state.showMenu ? 'yes' : ''">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo">
            <router-link class="logo" to="/" v-html="assets.bWorksLogo"></router-link>
          </div>
          <div class="menu-toggle">
            <menu-toggle />
          </div>
          <div class="hire-us">
            <a class="hire-us animated" :href="$i18n.t('link.hire_us')">{{ $t('button.hire_us') }}</a>
          </div>
        </div>
      </div>
      <menu-overlay />
    </header>

    <router-view></router-view>

    <preload-overlay />
  </div>
</template>

<script type="text/javascript">
  import MenuToggle from './components/elements/MenuToggle'
  import MenuOverlay from './components/elements/MenuOverlay'
  import PreloadOverlay from './components/elements/PreloadOverlay'

  export default {
    name: 'App',

    data () {
      return {
        assets: {
          bWorksLogo: require('!!raw!./assets/images/bworks-logo.svg')
        }
      }
    },

    created () {
      this.updateLanguage()
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
      MenuToggle,
      MenuOverlay,
      PreloadOverlay
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

    & {
      .header-wrapper {
        a.hire-us {
          color: $link-color;

          &.animated {
            &:after {
              background-color: $link-color;
            }

            @include hover-focus {
              color: $white;
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
</style>
