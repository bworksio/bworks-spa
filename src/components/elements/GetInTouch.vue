<template lang="html">
  <div class="contact" :class="hoverClass">
    <h2 @mouseenter="showAll()">{{ $t('message.contact') }}</h2>

    <a href="mailto:contact@b-works.io" class="email">
      <div class="icon" v-html="assets.email"></div>
      <div class="animation-wrapper">
        <div class="animated onhover mirrored">contact@b-works.io</div>
      </div>
    </a>

    <a href="tel:+41792240112" class="phone">
      <div class="icon" v-html="assets.phone"></div>
      <div class="animation-wrapper">
        <div class="phone-number animated onhover">+41 79 224 0112</div>
      </div>
    </a>
  </div>
</template>

<script type="text/javascript">
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

<style rel="stylesheet/scss" lang="scss">
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

      &:hover {
        .animation-wrapper > .animated {
          transform: translateX(0) !important;
        }
      }

      .animated {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

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
        transform: translateX(0) !important;
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
</style>
