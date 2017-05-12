<template lang="html">
  <div class="social-links">
    <h3 v-if="headline">{{ $t('follow_us') }}</h3>
    <a class="facebook" :href="social.facebook"><span class="icon" v-if="icon" v-html="assets.facebook"></span><span class="text" v-if="text">Facebook</span></a>
    <a class="twitter" :href="social.twitter"><span class="icon" v-if="icon" v-html="assets.twitter"></span><span class="text" v-if="text">Twitter</span></a>
    <a class="instagram" :href="social.instagram"><span class="icon" v-if="icon" v-html="assets.instagram"></span><span class="text" v-if="text">Instagram</span></a>
    <a class="linkedin" :href="social.linkedin"><span class="icon" v-if="icon" v-html="assets.linkedin"></span><span class="text" v-if="text">Linkedin</span></a>
  </div>
</template>

<script type="text/javascript">
  import config from '../../config/app.json'

  export default {
    name: 'SocialLinks',

    props: {
      headline: { type: Boolean, default: true },
      icon: { type: Boolean, default: true },
      text: { type: Boolean, default: true }
    },

    data () {
      return {
        assets: {
          facebook: require('!!raw!../../assets/images/icon-facebook.svg'),
          twitter: require('!!raw!../../assets/images/icon-twitter.svg'),
          instagram: require('!!raw!../../assets/images/icon-instagram.svg'),
          linkedin: require('!!raw!../../assets/images/icon-linkedin.svg')
        },
        social: config.social
      }
    },

    i18n: {
      messages: {
        en: {
          follow_us: 'Follow us'
        },
        de: {
          follow_us: 'Folgen Sie uns'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixins.scss";

  .social-links {
    color: $gray-color;

    h3 {
      margin: 6rem 0 1em;
      font-size: $font-size-h3;
      color: $brand-primary !important;
    }

    a {
      float: left;
      display: flex;
      align-items: center;
      font-weight: $font-weight-normal;
      color: $gray-color;

      @include hover-focus {
        color: $body-color;
      }
    }

    .icon {
      margin-right: 1rem;
    }
  }
</style>
