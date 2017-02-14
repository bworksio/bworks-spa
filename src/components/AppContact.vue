<template lang="html">
  <div class="contact row">
    <h2 class="col" @mouseenter="show = true">Get in touch</h2>

    <div class="email col" :class="hoverClass">
      <div class="icon" v-html="assets.email"></div>
      <div class="animation-wrapper">
        <div class="animated mirrored">
          <a href="mailto:contact@b-works.io">contact@b-works.io</a></div>
      </div>
    </div>

    <div class="phone col" :class="hoverClass">
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../assets/scss/mixins';

  .contact {
    align-items: center;

    h2 {
      order: 2;
      color: $brand-primary;
      text-align: center;
      text-transform: none;
      margin: 0;
    }

    @include media-breakpoint-down(sm) {
      h2 {
        font-size: 1rem;
        line-height: 1.357142857;
        letter-spacing: .066428571em;
      }

      svg {
        width: 18px;
        height: auto;
      }
    }

    .email,
    .phone {
      display: flex;
      align-items: center;
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

      .animated {
        padding-right: 1rem;
      }
    }

    .phone {
      order: 3;
      justify-content: flex-start;

      .animated {
        padding-left: 1rem;
      }
    }
  }
</style>
