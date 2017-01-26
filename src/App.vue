<template>
  <div id="app">
    <p>
      <router-link to="/">Go to /</router-link>
      <router-link to="/test">Go to Test</router-link>
    </p>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      // Hello
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
