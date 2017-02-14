<template>
  <div :class="'node node-' + node.type[0].target_id">
    <div class="footer-contact container">
      <app-contact></app-contact>
    </div>

    <div class="footer-address container-fluid">
      <div class="footer-hosted">
        <span class="icon" v-html="assets.switzerland"></span>
        <span class="h4 text">All data 100% stored and hosted in Switzerland</span>
      </div>

      <div class="footer-addresses">
        <div class="footer-addresses-1" v-html="node.field_body_social_links[0].value"></div>
        <div class="footer-addresses-2" v-html="node.field_body_addresses[0].value"></div>
      </div>

      <div class="footer-social-links">
        <a class="facebook" href="#"><span class="icon" v-html="assets.facebook"></span><span class="text">Facebook</span></a>
        <a class="twitter" href="#"><span class="icon" v-html="assets.twitter"></span><span class="text">Twitter</span></a>
        <a class="instagram" href="#"><span class="icon" v-html="assets.instagram"></span><span class="text">Instagram</span></a>
        <a class="linkedin" href="#"><span class="icon" v-html="assets.linkedin"></span><span class="text">Linkedin</span></a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import AppContact from '../AppContact'

  export default {
    name: 'bworks_footer',
    props: {
      // Node id of the section
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        node: {},
        assets: {
          switzerland: require('!!raw!../../assets/icon-switzerland.svg'),
          facebook: require('!!raw!../../assets/icon-facebook.svg'),
          twitter: require('!!raw!../../assets/icon-twitter.svg'),
          instagram: require('!!raw!../../assets/icon-instagram.svg'),
          linkedin: require('!!raw!../../assets/icon-linkedin.svg')
        }
      }
    },
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    },
    components: {
      AppContact
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_footer {
    padding-top: 4rem;
    margin-bottom: 2rem;
  }

  .footer-contact {
    padding-bottom: 4rem;
  }

  .footer-address {
    display: flex;
    flex-wrap: wrap;
    padding-top: 2rem;
    padding-bottom: 1.5rem;
    background-color: $gray-bg;

    a {
      color: $gray-color;
      font-weight: normal;
    }
  }

  .footer-hosted {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 1.75rem;
    }
  }

  .footer-addresses {
    color: $gray-color;
  }

  .footer-social-links {
    color: $gray-color;

    > a {
      display: flex;
      align-items: center;
    }

    .icon {
      margin-right: 1rem;
    }

    @include media-breakpoint-down(xl) {
      .text {
        display: none;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .footer-hosted {
      flex: 1 100%;
      margin-bottom: 2rem;
    }
    .footer-addresses {
      flex: 2 83.3333%;
    }
    .footer-social-links {
      flex: 1 auto;

      .icon {
        display: block;
        margin-bottom: .66rem;
      }
    }
  }

  @include media-breakpoint-only(md) {
    .footer-hosted {
      flex: 1 27.27272%;
      display: block;

      .text {
        display: block;
        margin-top: .5rem;
        padding-right: 8.33333%;
      }
    }
    .footer-addresses {
      flex: 1 72.727273%;
      display: flex;

      > div {
        flex: 1 50%;
      }
    }
    .footer-social-links {
      flex: 1 100%;
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
    }
  }

  @include media-breakpoint-up(lg) {
    .footer-address {
      align-items: flex-end;
    }
    .footer-hosted {
      flex: 1 100%;

      .text {
        max-width: 41.6667%;
      }
    }
    .footer-addresses {
      order: 3;
      flex: 1 50%;
      display: flex;
      align-items: flex-end;

      > div {
        flex: 1 50%;
      }
      p:last-child {
        margin: 0;
      }
    }
    .footer-social-links {
      order: 2;
      flex: 1 50%;
      margin-top: 2rem;
      display: flex;
      justify-content: flex-start;

      > a {
        min-width: 16.66667%;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .footer-social-links {
      > a {
        margin-right: 2rem;
      }
    }
  }
</style>
