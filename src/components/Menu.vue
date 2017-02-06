<template>
  <nav class="menu-main">
    <ul>
      <li v-for="item in menuItems">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import utils from '../utils'
  import routerConfig from '../config/routes'

  export default {
    name: 'Menu',
    data () {
      return {
        menuItems: []
      }
    },
    created () {
      this.fetchMenuItems()
    },
    watch: {
      '$route' (to, from) {
        this.fetchMenuItems()
      }
    },
    methods: {
      fetchMenuItems () {
      let menuItems = []
      const lang = this.$store.state.currentLanguage
      utils.forEach(routerConfig, (languages, name) => {
        menuItems.push(languages[lang])
      })
      this.menuItems = menuItems
    }
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
