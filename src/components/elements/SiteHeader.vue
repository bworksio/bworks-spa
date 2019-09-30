<template>
  <header
    id="site-header"
    :data-show-menu="$store.state.showMenu ? 'yes' : ''"
    :class="{ invert: invert }"
  >
    <div class="container">
      <div class="header-wrapper">
        <div class="logo">
          <router-link class="logo" to="/" v-html="assets.bWorksLogo"></router-link>
        </div>
        <div class="menu-toggle">
          <menu-toggle />
        </div>
        <div class="hire-us">
          <a v-show="lang === 'en'"
            @click.prevent
            class="hire-us typeform-share button"
            :href="typeformLinkEn"
            data-mode="drawer_right"
            target="_blank"
          >{{ $t('button.hire_us') }}</a>
          <a v-show="lang === 'de'"
            @click.prevent
            class="hire-us typeform-share button"
            :href="typeformLinkDe"
            data-mode="drawer_right"
            target="_blank"
          >{{ $t('button.hire_us') }}</a>
        </div>
      </div>
    </div>
    <menu-overlay />
  </header>
</template>

<script>
import MenuToggle from '@/components/elements/MenuToggle'
import MenuOverlay from '@/components/elements/MenuOverlay'
import translations from '@/translations/index'

export default {
  name: 'SiteHeader',

  data() {
    return {
      invert: false,
      typeformLinkEn: translations.en.link.hire_us,
      typeformLinkDe: translations.de.link.hire_us,
      assets: {
        bWorksLogo: require('!!raw-loader!assets/images/bworks-logo.svg')
      }
    }
  },
  computed: {
    lang() {
      return this.$store.state.currentLanguage
    }
  },
  methods: {
    createScript() {
      var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName,
        id = "typef_orm_share", b = "https://embed.typeform.com/";
      if (!gi.call(d, id)) {
        js = ce.call(d, "script");
        js.id = id;
        js.src = b + "embed.js";
        q = gt.call(d, "script")[0];
        q.parentNode.insertBefore(js, q)
      }
    },
  },

  mounted() {
    this.$root.$on('site-header-invert', invert => {
      this.invert = invert
    })
    this.createScript()
  },

  components: {
    MenuToggle,
    MenuOverlay
  }
}
</script>

<style lang="scss">
@import "assets/scss/mixins";

#site-header {
  position: fixed;
  top: 0;
  width: 100%;
  min-height: 75px;
  padding: calc(2rem + 1vw) 0 0;
  background-color: $white;
  z-index: 990;
  transform: translateY(-1.25rem);
  transition: 0.2s;
  transition-property: transform, background-color;
  font-size: 1.28571rem;
  .typeform-share {
    display: inline-block;
    text-decoration: none;
    background-color: #267ddd;
    color: white;
    cursor: pointer;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    margin: 0;
    height: 50px;
    padding: 0px 33px;
    border-radius: 25px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
    color: $white;
    font-size: 1.28571rem;
    &.animated:after {
      background-color: $white;
    }
  }

  // Header wrapper container
  > .container {
    z-index: 991;
  }

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      width: 33.3333%;
      z-index: 991;
    }

    div.logo {
      a {
        display: block;
        width: 7rem;
        transform: scale(0.715);
        transform-origin: left;
        transition: 0.2s;
        transition-property: color, transform;
      }

      svg {
        max-width: 100%;
      }

      .st0 {
        fill: $body-color;
        transition: fill 0.2s;
      }
    }

    div.menu-toggle {
      text-align: center;
    }

    div.hire-us {
      text-align: right;
    }

    a {
      color: $body-color;

      &.animated {
        @include hover-focus {
          color: $white;
        }

        &:after {
          background-color: $body-color;
        }

        @include media-breakpoint-down(md) {
          &:after {
            display: none;
          }
        }
      }
    }

    a.hire-us {
      transform: translateX(0);
    }
  }

  // Invert link colors
  &.invert,
  &[data-show-menu="yes"],
  html.fp-enabled & {
    background-color: transparent;
    background-image: linear-gradient(
      to bottom,
      transparentize(#222, 0.66),
      transparentize(#222, 1)
    );
    transform: translateY(0);

    .header-wrapper {
      div.logo {
        a {
          @media (min-width: 346px) {
            transform: scale(0.815);
          }
        }

        .st0 {
          fill: $white;
        }
      }

      a,
      a.hire-us {
        color: $white;

        &.animated {
          &:after {
            background-color: $white;
          }

          @include hover-focus {
            color: $body-color;
          }

          @include media-breakpoint-down(sm) {
            &:after {
              display: none;
            }
          }
        }
      }
    }
  }

  & {
    .header-wrapper {
      a.hire-us {
        color: $link-color;

        &.animated {
          &:after {
            background-color: $link-color;
          }

          @include hover-focus {
            color: $white;
          }

          @include media-breakpoint-down(sm) {
            &:after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
