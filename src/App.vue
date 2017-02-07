<template>
  <div id="app">
    <app-menu></app-menu>
    <app-language-switcher></app-language-switcher>

    <router-view></router-view>

    <transition name="fade">
      <div v-if="isLoading" id="preloading">
        <div v-html="assets.bWorksLogo" class="logo"></div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import Menu from 'components/Menu'
  import LanguageSwitcher from 'components/LanguageSwitcher'

  export default {
    name: 'App',
    data () {
      return {
        assets: {
          bWorksLogo: require('!!raw!./assets/bworks-bolzano.svg')
        }
      }
    },
    computed: {
      isLoading () {
        return !this.$store.state.initialized
      },
      error () {
        return this.$store.getters.getError
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
      'app-menu': Menu,
      'app-language-switcher': LanguageSwitcher
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  nav {
    ul {
      list-style: none;
    }
  }

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
