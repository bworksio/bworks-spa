<template>
  <div id="app">
    <header id="site-header">
      <div class="container">
        <div class="header-wrapper">
          <a class="logo" href="/" v-html="assets.bWorksLogo"></a>
          <app-menu-toggle></app-menu-toggle>
          <a class="hire-us animated" href="https://cosmobutler.typeform.com/to/oY7ARZ">Hire us</a>
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
    padding: calc(2rem + 1vw) 0 1rem;
    // Disabled due to ugly color banding.
    //background-image: linear-gradient(to bottom, rgba(74,74,74,.09), rgba(74,74,74,0));
    z-index: 990;

    .header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        .st0 {
          fill: $body-color;
        }
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

      // Invert link colors
      &.invert {
        .logo {
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

    .logo,
    .menu-toggle,
    .hire-us {
      z-index: 991;
    }

    .logo {
      width: 7rem;

      .st0 {
        transition: .2s;
      }
    }

    .hire-us {
      transform: translateX(0);
    }

    a {
      color: $white;
      transition: .2s;

      &.animated:after {
        background-color: $white;
        transition: .2s;
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
