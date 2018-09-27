<template lang="html">
  <div class="contact">
    <h2 @mouseenter="showAll()">{{ $t('message.contact') }}</h2>

    <a href="mailto:contact@b-works.io" class="email animate-onhover">
      <div class="icon" v-html="assets.email"></div>
      <div class="animation-wrapper" :class="hoverClass">
        <div class="animated mirrored">contact@b-works.io</div>
      </div>
    </a>

    <a href="tel:+41792240112" class="phone animate-onhover">
      <div class="icon" v-html="assets.phone"></div>
      <div class="animation-wrapper" :class="hoverClass">
        <div class="phone-number animated">+41 44 500 2615</div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'GetInTouch',

    data () {
      return {
        assets: {
          email: require('!!raw-loader!assets/images/icon-email.svg'),
          phone: require('!!raw-loader!assets/images/icon-phone.svg')
        },
        show: false
      }
    },

    computed: {
      hoverClass () {
        return this.show ? 'run' : ''
      }
    },

    methods: {
      showAll (state = true) {
        this.show = state
      }
    },

    mounted () {
      /* global _googWcmGet */
      if (window.hasOwnProperty('_googWcmGet')) {
        _googWcmGet('phone-number', '+41 79 224 0112')
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .contact {
    h2 {
      color: $brand-primary;
      text-transform: none;
      text-align: center;
      margin: 0;
    }

    .icon {
      line-height: 0;
    }

    .email,
    .phone {
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover,
      &:focus {
        text-decoration: underline;
      }

      .animated {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    // Disable animations in menu overlay
    .menu-contact & {
      h2,
      .email,
      .phone {
        margin-bottom: 1vh;
        text-transform: none;

        @include media-breakpoint-down(sm) {
          font-size: 1rem;
        }

        @include media-breakpoint-down(md) {
          svg {
            width: auto;
            height: 18px;
          }
        }

        @include media-breakpoint-up(lg) {
          font-size: 1.57142rem;
          line-height: 1.36364;

          svg {
            width: auto;
            height: 24px;
          }
        }
      }

      .animation-wrapper > .animated {
        transform: translateX(0);
        opacity: 1;
      }
    }

    // Limit horizontal/animated style to footer instance
    .footer-contact & {
      @media (max-width: 345px) {
        .icon {
          display: none !important;
        }

        .email {
          margin-bottom: 2px !important;
        }

        .animated {
          padding: 0 !important;
        }
      }

      @include media-breakpoint-down(md) {
        h2 {
          font-size: 1rem;
          line-height: 1.35714;
          letter-spacing: .06642em;
          margin-bottom: .75rem;
        }

        .email {
          margin-bottom: .5rem;
        }

        .icon,
        .animation-wrapper,
        .animated {
          display: inline;
        }

        .animation-wrapper > .animated {
          transform: translateX(0) !important;
          opacity: 1;
        }

        svg {
          width: 18px;
          height: auto;
        }
      }

      @include media-breakpoint-up(lg) {
        display: flex;
        align-items: center;
        text-align: center;

        h2,
        .email,
        .phone {
          width: 33.33333%;
        }

        h2 {
          order: 2;
          text-align: center;
          text-transform: none;
          margin: 0;
        }

        .email {
          order: 1;
          justify-content: flex-end;

          .icon {
            order: 2;
          }

          .animation-wrapper {
            order: 1;
          }
        }

        .phone {
          order: 3;
          justify-content: flex-start;
        }
      }
    }
  }
</style>
