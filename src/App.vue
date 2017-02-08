<template>
  <div id="app">
    <header id="site-header">
      <div class="container">
        <div class="header-wrapper">
          <a class="logo" href="/" v-html="assets.bWorksLogo"></a>
          <app-menu-toggle></app-menu-toggle>
          <a class="animated" href="#">Hire us</a>
        </div>
      </div>
    </header>

    <router-view></router-view>

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
  import MenuToggle from 'components/MenuToggle'

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
      isLoading () {
        return !this.$store.state.initialized
      },
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
      'app-menu-toggle': MenuToggle
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './assets/scss/main';

  #preloading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;

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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
