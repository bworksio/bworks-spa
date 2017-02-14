<template lang="html">
  <a class="menu-toggle" @click.prevent="toggleMenu()" href="#">{{ $store.state.showMenu ? 'Close' : 'Menu' }}</a>
</template>

<script type="text/javascript">
  export default {
    name: 'MenuToggle',
    // Methods
    methods: {
      toggleMenu () {
        this.$store.commit('toggleMenu')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .menu-toggle {

  }
</style>
