<template>
  <header id="site-header" :data-show-menu="$store.state.showMenu ? 'yes' : ''" :class="{ invert: invert }">
    <div class="container">
      <div class="header-wrapper">
        <div class="logo">
          <router-link class="logo" to="/" v-html="assets.bWorksLogo"></router-link>
        </div>
        <div class="menu-toggle">
          <menu-toggle />
        </div>
        <div class="hire-us">
          <a class="hire-us animated" :href="$i18n.t('link.hire_us')">{{ $t('button.hire_us') }}</a>
        </div>
      </div>
    </div>
    <menu-overlay />
  </header>
</template>

<script>
  import MenuToggle from '@/components/elements/MenuToggle'
  import MenuOverlay from '@/components/elements/MenuOverlay'

  export default {
    name: 'SiteHeader',

    data () {
      return {
        invert: false,
        assets: {
          bWorksLogo: require('!!raw-loader!assets/images/bworks-logo.svg')
        }
      }
    },

    mounted () {
      this.$root.$on('site-header-invert', invert => {
        this.invert = invert
      })
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
    transition: .2s;
    transition-property: transform, background-color;
    font-size: 1.28571rem;

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
          transform: scale(.715);
          transform-origin: left;
          transition: .2s;
          transition-property: color, transform;
        }

        svg {
          max-width: 100%;
        }

        .st0 {
          fill: $body-color;
          transition: fill .2s;
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
    &[data-show-menu=yes],
    html.fp-enabled & {
      background-color: transparent;
      background-image: linear-gradient(to bottom, transparentize(#222, .66), transparentize(#222, 1));
      transform: translateY(0);

      .header-wrapper {
        div.logo {
          a {
            @media (min-width: 346px) {
              transform: scale(.815);
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
