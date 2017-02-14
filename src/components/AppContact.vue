<template lang="html">
  <div class="contact" :class="hoverClass">
    <h2 @mouseenter="showAll()">Get in touch</h2>

    <div class="email">
      <div class="icon" v-html="assets.email"></div>
      <div class="animation-wrapper">
        <div class="animated mirrored">
          <a href="mailto:contact@b-works.io">contact@b-works.io</a></div>
      </div>
    </div>

    <div class="phone">
      <div class="icon" v-html="assets.phone"></div>
      <div class="animation-wrapper">
        <div class="animated"><a href="tel:+41792240112">+41 79 224 0112</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Contact',
    // Variables
    data () {
      return {
        assets: {
          email: require('!!raw!../assets/icon-email.svg'),
          phone: require('!!raw!../assets/icon-phone.svg')
        },
        show: false
      }
    },
    computed: {
      hoverClass () {
        return this.show ? 'hover' : ''
      }
    },
    methods: {
      showAll (state = true) {
        this.show = state
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../assets/scss/mixins';

  .contact {
    h2 {
      color: $brand-primary;
      text-transform: none;
      text-align: center;
      margin: 0;
    }

    .email,
    .phone {
      display: flex;
      align-items: center;
      justify-content: center;

      .animated {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    @include media-breakpoint-down(md) {
      h2 {
        font-size: 1rem;
        line-height: 1.357142857;
        letter-spacing: .066428571em;
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
