<template>
  <footer :class="'node node-' + getType()">
    <div class="footer-newsletter container-fluid">
      <!-- Begin MailChimp Signup Form -->
      <div id="mc_embed_signup">
        <form action="//b-works.us15.list-manage.com/subscribe/post?u=1746499f03d9d9a590bb7248e&amp;id=5df773ae8f" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <h2>{{ $t('message.newsletter_subscribe') }}</h2>
            <div class="mc-field-group">
              <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
              <label for="mce-EMAIL">{{ $t('message.email_address') }} </label>
            </div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display:none"></div>
              <div class="response" id="mce-success-response" style="display:none"></div>
            </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1746499f03d9d9a590bb7248e_5df773ae8f" tabindex="-1" value=""></div>
            <div class="submit"><button type="submit" name="subscribe" id="mc-embedded-subscribe" class="button animated">{{ $t('button.subscribe') }}</button></div>
          </div>
        </form>
      </div>
      <!--End mc_embed_signup-->
    </div>

    <div class="footer-contact container">
      <get-in-touch></get-in-touch>
    </div>

    <div class="footer-address container-fluid">
      <div class="footer-hosted">
        <span class="icon" v-html="assets.switzerland"></span>
        <span class="h4 text">{{ $t('message.data_switzerland') }}</span>
      </div>

      <div class="footer-addresses">
        <div class="footer-addresses-1" v-html="getField('field_body_addresses', 'value', 0)"></div>
        <div class="footer-addresses-2" v-html="getField('field_body_addresses', 'value', 1)"></div>
      </div>

      <social-links :headline="false"></social-links>
    </div>
  </footer>
</template>

<script type="text/javascript">
  import Node from '@/components/nodes/Node'
  import GetInTouch from '@/components/elements/GetInTouch'
  import SocialLinks from '@/components/elements/SocialLinks'

  export default {
    name: 'bworks_footer',
    extends: Node,
    data () {
      return {
        node: {},
        assets: {
          switzerland: require('!!raw-loader!assets/images/icon-switzerland.svg')
        }
      }
    },
    components: {
      GetInTouch,
      SocialLinks
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_footer {
    padding-top: 4rem;
    margin-bottom: 2rem;
  }

  .footer-newsletter {
    padding-top: 4rem;
    padding-bottom: 4rem;
    background-color: $brand-primary;

    h2 {
      width: 100%;
    }

    @include media-breakpoint-down(md) {
      .mc-field-group {
        width: 83.3333%;

        input {
          width: 100%;
        }
      }

      .submit {
        width: 83.3333%;
        margin-top: 8rem;
      }
    }

    @include media-breakpoint-up(lg) {
      #mc_embed_signup_scroll {
        display: flex;
        flex-wrap: wrap;
        padding-left: 16.6667%;
        padding-right: 16.6667%;
      }

      .mc-field-group {
        width: 50%;
      }

      .submit {
        margin-top: 2.7rem;
        margin-left: 10rem;
      }
    }

    h2,
    label,
    input {
      color: $white;
    }

    .mc-field-group {
      position: relative;
      margin-top: 2.2rem;

      label {
        position: absolute;
        top: 0;
        transition: transform .2s ease-out;
        transform: translateY(.2rem);
        transform-origin: left top;
      }

      input {
        position: absolute;
        top: 0;
        width: 100%;
        font-size: 18px;
        letter-spacing: .066666667em;
        border: 0;
        border-bottom: 1px solid $white;
        background-color: transparent;
        outline: 0;
        transition: background-color .2s ease-out;
      }

      input {
        &:focus {
          background-color: lighten($brand-primary, 3%);
        }

        &:focus,
        &:not(:focus):valid {
          + label {
            transform: translateY(-1.2rem) scale(.75);
          }
        }
      }
    }

    button.animated {
      padding: 0;
      border: none;
      color: $white;
      background-color: transparent;
      font-family: $font-family-sans-serif;
      font-weight: $font-weight-bold;
      letter-spacing: .083125em;
      text-transform: uppercase;
      cursor: pointer;

      &:after {
        background-color: $white;
      }

      @include hover-focus {
        color: $brand-primary;
      }
    }

    .submit {
      text-align: center;
    }
  }

  .footer-contact {
    padding-top: 4rem;
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

  footer .social-links a {
    float: none;
  }

  @include media-breakpoint-down(sm) {
    .footer-hosted {
      flex: 1 100%;
      margin-bottom: 2rem;
    }
    .footer-addresses {
      flex: 2 83.3333%;
    }
    footer .social-links {
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
    footer .social-links {
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
    footer .social-links {
      order: 2;
      flex: 1 50%;
      margin-top: 2rem;
      display: flex;
      justify-content: flex-start;

      a {
        margin-right: 2rem;
        min-width: 16.66667%;
      }
    }
  }

  @include media-breakpoint-down(xl) {
    footer .social-links {
      .text {
        @include sr-only;
      }
    }
  }
</style>
