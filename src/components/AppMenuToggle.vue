<template lang="html">
  <a class="menu-toggle" @click.prevent="toggleMenu()" href="#">{{ $store.state.showMenu ? 'Close' : 'Menu' }}</a>
</template>

<script type="text/javascript">
  export default {
    name: 'MenuToggle',
    watch: {
      '$route' (to, from) {
        // Close menu (if open) on navigating to a new page.
        this.$store.state.showMenu && this.toggleMenu()
      }
    },
    methods: {
      /**
       * Toggle menu visibity.
       */
      toggleMenu () {
        this.$store.commit('toggleMenu')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
