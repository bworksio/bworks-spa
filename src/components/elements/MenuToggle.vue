<template lang="html">
  <a class="menu-toggle" @click.prevent="toggleMenu()" href="#">{{ $t($store.state.showMenu ? 'close' : 'menu') }}</a>
</template>

<script>
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
    },

    i18n: {
      messages: {
        en: {
          menu: 'Menu',
          close: 'Close'
        },
        de: {
          menu: 'Menü',
          close: 'Schliessen'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  a.menu-toggle {
    // Vertically center the element.
    transform: translateX(-33.333%);
    text-decoration: underline;

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
