<template>
  <div id="main-menu">
    <div class="container">
      <div class="row">
        <nav class="menu-menu col-sm-12">
          <ul>
            <li v-for="item in menuItems">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="menu-contact col-sm-12">
          <app-contact></app-contact>
        </div>
        <div class="menu-language-switcher col-sm-12">
          <app-language-switcher></app-language-switcher>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import utils from '../utils'
  import routerConfig from '../config/routes'
  import AppContact from './AppContact'
  import AppLanguageSwitcher from './AppLanguageSwitcher'

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
      AppContact,
      AppLanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../assets/scss/mixins';

  #main-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparentize($brand-primary, .1);
    padding-top: calc(119px + 11.5vh);
    z-index: 989;

    // Override AppContact component colors
    .contact {
      h2 {
        color: $white;
      }
      svg {
        #Shape {
          fill: $white;
        }
      }
    }
  }
</style>
