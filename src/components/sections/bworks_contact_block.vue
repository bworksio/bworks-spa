<template>
  <div class="node node-bworks_contact_block">
    <div class="container">
      <div class="col-sm-8 offset-sm-2">
        <h1>{{ getField('title') }}</h1>
        <div class="body" v-html="getField('body')"></div>
        <div class="request">
          <a class="animated" href="#">{{ $t('send_request') }}</a>
        </div>
      </div>

      <contact-map></contact-map>

      <div class="col-sm-8 offset-sm-2">
        <div class="addresses">
          <div class="address" v-html="$t('address_zurich')" />
          <div class="address" v-html="$t('address_bolzano')" />
        </div>

        <social-links :icon="false"></social-links>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import ContactMap from '../helpers/ContactMap'
  import SocialLinks from '../helpers/SocialLinks'

  export default {
    name: 'bworks_contact_block',

    extends: Node,

    components: {
      ContactMap,
      SocialLinks
    },

    i18n: {
      messages: {
        en: {
          send_request: 'Send request',
          address_zurich: 'Birmensdorferstrasse 541<br>8055 Zurich<br>Switzerland',
          address_bolzano: 'Museumstrasse 41/A<br>39100 Bozen<br>Italy'
        },
        de: {
          send_request: 'Anfrage senden',
          address_zurich: 'Birmensdorferstrasse 541<br>8055 Zürich<br>Schweiz',
          address_bolzano: 'Museumstrasse 41/A<br>39100 Bozen<br>Italien'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_contact_block {
    padding-top: 15rem;

    h1 {
      border-bottom: 4px solid $brand-primary;

      @include media-breakpoint-up(sm) {
        max-width: 66%;
      }
    }

    .request {
      margin-top: 4rem;
      text-align: center;
    }

    .addresses {
      display: flex;
      justify-content: space-around;

      .address {
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }

    .social-links {
      a {
        margin-right: 2rem;
      }
    }
  }
</style>
