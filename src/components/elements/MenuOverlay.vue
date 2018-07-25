<template>
  <transition name="menu">
    <div id="main-menu" v-show="$store.state.showMenu">
      <div class="container">
        <div class="menu-wrapper">
          <nav class="menu-main">
            <ul>
              <li v-for="item in menuItems" v-if="item.title">
                <router-link :to="getMenuItemPath(item)" exact>{{ item.title }}</router-link>
                <div class="line">&nbsp;</div>
              </li>
            </ul>
          </nav>
          <div class="menu-contact">
            <get-in-touch />
          </div>
          <div class="menu-social-links">
            <a class="facebook" :href="social.facebook">Facebook</a>
            <a class="twitter" :href="social.twitter">Twitter</a>
            <a class="instagram" :href="social.instagram">Instagram</a>
            <a class="linkedin" :href="social.linkedin">Linkedin</a>
          </div>
          <div class="menu-language-switcher">
            <language-switcher />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import config from '@/config/app.json'
  import routesConfig from '@/config/routes'
  import GetInTouch from '@/components/elements/GetInTouch'
  import LanguageSwitcher from '@/components/elements/LanguageSwitcher'
  const forEach = require('axios/lib/utils.js').forEach

  export default {
    name: 'Menu',
    data () {
      return {
        menuItems: [],
        social: config.social
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
        forEach(routesConfig, (languages, name) => {
          if (!('show' in languages) || !!languages.show) {
            languages[lang]['name'] = name + '_' + lang
            menuItems.push(languages[lang])
          }
        })
        this.menuItems = menuItems
      },

      /**
       * Provides empty params for routes that use them
       */
      getMenuItemPath (item) {
        const path = item.path
        if (path.indexOf(':') !== -1) {
          const re = /:(\w+)/g
          let params = {}
          let m
          do {
            m = re.exec(path)
            if (m) params[m[1]] = null
          } while (m)
          return { name: item.name, params }
        }
        return path
      }
    },
    components: {
      GetInTouch,
      LanguageSwitcher
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  #main-menu {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparentize($brand-primary, .1);
    padding-top: calc(75px + 2rem + 1vw);
    z-index: 989;
  }

  .menu-wrapper {
    display: flex;

    @media (max-height: 414px) {
      .menu-main {
        width: 83.33333% !important;

        ul {
          flex-wrap: wrap;
          max-height: calc(100vh - (75px + 2rem + 1vw) - 4rem);
        }
      }

      .menu-contact,
      .menu-language-switcher,
      .menu-social-links {
        display: none !important;
      }
    }

    @media (max-width: 667px) {
      flex-direction: column;
      align-items: center;
      align-content: space-between;

      .menu-main,
      .menu-contact,
      .menu-language-switcher {
        width: 83.33333%;
      }

      .menu-social-links {
        display: none;
      }
    }

    @media (min-width: 668px) {
      flex-wrap: wrap;

      .menu-main,
      .menu-contact {
        width: 50%;
        align-self: center;
      }
      .menu-social-links {
        width: 75%;
        margin-top: 5.185vh;
      }
      .menu-language-switcher {
        width: 25%;
        margin-top: 5.185vh;
      }
    }
  }

  .menu-main {
    font-size: 1rem;
    line-height: 2.14285;
    letter-spacing: .06642em;
    margin-bottom: calc(1rem + 1.4815vh);

    a {
      display: block;
    }

    .line {
      height: 1px;
      margin-top: 1px;
      margin-bottom: 1px;
      background-color: $white;
      transform: translateX(-101%);
      transition: transform .2s cubic-bezier(unquote($menu));

      @media (min-width: 768px) {
        margin-top: .875vh;
        margin-bottom: .875vh;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    li {
      overflow: hidden;

      &:focus,
      &:hover {
        .line {
          transform: translateX(0);
        }
      }
    }

    a.router-link-active + .line {
      transform: translateX(0);
    }

    @include media-breakpoint-down(sm) {
      line-height: 1.64285;

      .line {
        margin-top: .33333vh;
      }

      li {
        margin-bottom: .5vh;
      }
    }

    @media (min-width: 360px) {
      font-size: calc(1rem + .7vh);
      line-height: 1.5;
      letter-spacing: .06667em;
    }

    @media (min-width: 414px) {
      font-size: calc(1rem + 1.4815vh);
    }
  }

  // Override AppContact component colors
  .menu-contact {
    margin-bottom: calc(1rem + 1.4815vh);

    .contact h2 {
      color: $white;
    }
    svg {
      #Shape {
        fill: $white;
      }
    }
  }

  .menu-social-links {
    a {
      font-weight: normal;
      text-decoration: underline;

      & + a {
        margin-left: 8.33333%;
      }
    }
  }

  .menu-language-switcher {
    ul {
      display: flex;
      justify-content: space-between;
    }
  }

  @include media-breakpoint-down(sm) {
    .menu-main,
    .menu-contact,
    .menu-language-switcher {
      width: 100%;
    }
  }

  // Animations
  // Enter
  .menu-enter-active {
    transition: transform .3s ease-out;

    .menu-wrapper {
      transition: opacity .2s ease-out .1s;
    }
  }

  .menu-enter {
    transform: translateY(-100%);

    .menu-wrapper {
      opacity: 0;
    }
  }

  // Leave
  .menu-leave-active {
    transition: transform .3s ease-out /*.3s*/;

    .menu-wrapper {
      transition: opacity .2s ease-out /*.3s*/;
    }

/*
    .menu-main {
      a {
        transition: opacity .3s ease-out !important;
      }
    }
*/
  }

  .menu-leave-to {
    transform: translateX(100%);

    .menu-wrapper {
      opacity: 0;
    }

    // FIXME :active is not working
/*
    .menu-main {
      a {
        &:not(:active) {
          opacity: 0;
        }
        &:active {
          opacity: 1;
          color: red;
        }
      }
    }
*/
  }
</style>
