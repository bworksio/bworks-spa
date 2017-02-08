<template lang="html">
  <div class="menu">
    <a class="menu-toggle" @click.prevent="toggleMenu()" href="#">Menu</a>
    <app-menu v-if="menuShown"></app-menu>
  </div>
</template>

<script type="text/javascript">
  import Menu from './Menu'

  export default {
    name: 'MenuToggle',
    // Variables
    data () {
      return {
        menuShown: false
      }
    },
    // When component uses other components
    components: {
      'app-menu': Menu
    },
    // Methods
    methods: {
      toggleMenu () {
        this.menuShown = !this.menuShown
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
