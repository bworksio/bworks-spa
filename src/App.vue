<template>
  <div id="app">
    <header id="site-header">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo">
            <a class="logo" href="/" v-html="assets.bWorksLogo"></a>
          </div>
          <div class="menu-toggle">
            <app-menu-toggle></app-menu-toggle>
          </div>
          <div class="hire-us">
            <a class="hire-us animated" href="https://cosmobutler.typeform.com/to/oY7ARZ">Hire us</a>
          </div>
        </div>
      </div>
      <transition name="menu">
        <app-menu v-if="$store.state.showMenu"></app-menu>
      </transition>
    </header>

    <transition name="fade">
      <router-view></router-view>
    </transition>

    <transition name="fade">
      <div v-if="isLoading" id="preloading">
        <div v-html="assets.bWorksPreloading" class="logo"></div>
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
          this.$store.commit('setLanguage', this.$route.matched[0].props.default.lang)
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
    padding: calc(1rem + 1vw) 0 .75rem;
    background-color: $white;
    z-index: 990;
    transition: .2s;
    transition-property: padding, background-color;

    a {
      color: $white;

      &.animated:after {
        background-color: $white;
      }
    }

    .header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        flex: 0 0 33.3333%;
        z-index: 991;
      }

      div.logo {
        a {
          display: block;
          width: 5rem;
          transition: .2s;
          transition-property: color, width;
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
    &.invert {
      padding: calc(2rem + 1vw) 0 1rem;
      background-color: transparent;
      background-image: linear-gradient(to bottom, transparentize($body-color, .4), transparentize($body-color, 1));

      .header-wrapper {
        div.logo {
          a {
            width: 7rem;
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

    .logo {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 250px;
      }
    }

    .error {
      position: absolute;
      top: 75%;
      width: 100%;
      text-align: center;
      color: red;
    }
  }
</style>
