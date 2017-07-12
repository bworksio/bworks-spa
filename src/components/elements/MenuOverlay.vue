<template>
  <transition name="menu">
    <div id="main-menu" v-if="$store.state.showMenu">
      <div class="container">
        <div class="menu-wrapper">
          <nav class="menu-main">
            <ul>
              <li v-for="item in menuItems" v-if="item.title">
                <router-link :to="item.path" exact>{{ item.title }}</router-link>
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

<script type="text/javascript">
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
            menuItems.push(languages[lang])
          }
        })
        this.menuItems = menuItems
      }
    },
    components: {
      GetInTouch,
      LanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  #main-menu {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparentize($brand-primary, .1);
    padding-top: 75px;
    z-index: 989;
  }

  .menu-wrapper {
    display: flex;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
      align-content: space-between;
      height: calc(100vh - 10vh - 10rem);

      .menu-main,
      .menu-contact,
      .menu-language-switcher {
        width: 83.33333%;
      }

      .menu-main {
        flex-basis: 50%;
      }
      .menu-contact {
        flex-basis: 30%;
      }
      .menu-social-links {
        display: none;
      }
      .menu-language-switcher {
        flex-basis: 20%;
      }
    }

    @include media-breakpoint-up(lg) {
      flex-wrap: wrap;

      .menu-main,
      .menu-contact {
        width: 50%;
        align-self: center;
      }
      .menu-social-links {
        width: 75%;
        margin-top: 4rem;
      }
      .menu-language-switcher {
        width: 25%;
        margin-top: 4rem;
      }
    }
  }

  .menu-main {
    font-size: 1rem;
    line-height: 2.14285;
    letter-spacing: .06642em;
    margin-top: 1rem;
    margin-bottom: .78571rem;

    .line {
      height: 1px;
      margin-top: .5rem;
      background-color: $white;
      transform: translateX(-101%);
      transition: transform .2s cubic-bezier(unquote($menu));
    }

    li {
      margin-bottom: .71428rem;
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

    @media (max-width: 345px) {
      line-height: 1.64285;

      .line {
        margin-top: 2px;
      }

      li {
        margin-bottom: 3px;
      }
    }

    @include media-breakpoint-up(md) {
      font-size: 2.14285rem;
      line-height: 1.5;
      letter-spacing: .06667em;
    }
  }

  // Override AppContact component colors
  .menu-contact {
    margin-bottom: 1rem;

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
