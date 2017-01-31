<template>
  <div id="app">
    <nav class="menu-main">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/test">Test</router-link></li>
      </ul>
    </nav>

    <router-view></router-view>

    <transition name="fade">
      <div v-if="isLoading" id="preloading">
        <div v-html="assets.bWorksLogo" class="logo"></div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
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
        return this.$store.state.error !== null ? this.$store.state.error.toString() : false
      }
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
