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
  @import '../assets/scss/mixins';

  .menu-toggle {
    // Vertically center the element.
    transform: translateX(-33.333%);

    &:before {
      content: "";
      display: block;
      width: 1px;
      height: calc(3.78571rem + 1vw);
      // Incredible, I've never heard of currentColor before (and it's OLD) :-)
      background-color: currentColor;
      margin: calc(-3.78571rem - .5rem - 1vw) auto .5rem;
      transform: scaleY(.68);
      transform-origin: top center;
      transition: transform .4s;
    }

    // Without :focus
    &:hover {
      &:before {
        transform: scaleY(1);
      }
    }
  }
</style>
