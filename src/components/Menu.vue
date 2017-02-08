<template>
  <div class="main-menu">
    <nav>
      <ul>
        <li v-for="item in menuItems">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    <app-language-switcher></app-language-switcher>
  </div>
</template>

<script type="text/javascript">
  import utils from '../utils'
  import routerConfig from '../config/routes'
  import LanguageSwitcher from './LanguageSwitcher'

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
    },
    components: {
      'app-language-switcher': LanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
