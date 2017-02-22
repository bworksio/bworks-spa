<template>
  <div id="main-menu">
    <div class="container">
      <div class="menu-wrapper">
        <nav class="menu-main">
          <ul>
            <li v-for="item in menuItems">
              <router-link :to="item.path">{{ item.title }}</router-link>
              <div class="line">&nbsp;</div>
            </li>
          </ul>
        </nav>
        <div class="menu-contact">
          <app-contact></app-contact>
        </div>
        <div class="menu-social-links">
          <a class="facebook" :href="social.facebook">Facebook</a>
          <a class="twitter" :href="social.twitter">Twitter</a>
          <a class="instagram" :href="social.instagram">Instagram</a>
          <a class="linkedin" :href="social.linkedin">Linkedin</a>
        </div>
        <div class="menu-language-switcher">
          <app-language-switcher></app-language-switcher>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import utils from '../utils'
  import config from '../config/app.json'
  import routesConfig from '../config/routes'
  import AppContact from './AppContact'
  import AppLanguageSwitcher from './AppLanguageSwitcher'

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
        utils.forEach(routesConfig, (languages, name) => {
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
    padding-top: 10rem;
    padding-bottom: 10vh;
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
    line-height: 2.142857143;
    letter-spacing: .066428571em;

    .line {
      height: 1px;
      margin-top: .5rem;
      background-color: $white;
      transform: translateX(-100%);
      transition: transform .2s cubic-bezier(unquote($menu));
    }

    li {
      margin-bottom: .714285714rem;
      overflow: hidden;

      &:hover {
        .line {
          transform: translateX(0);
        }
      }
    }

    @include media-breakpoint-up(md) {
      font-size: 2.142857143rem;
      line-height: 1.5;
      letter-spacing: .066666667em;
    }
  }

  // Override AppContact component colors
  .menu-contact {
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
