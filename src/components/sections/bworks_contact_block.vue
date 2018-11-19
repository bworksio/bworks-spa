<template>
  <div class="node node-bworks_contact_block">
    <div class="container">
      <div class="col-sm-8 offset-sm-2">
        <h1>{{ getField('title') }}</h1>
        <div class="body" v-html="getField('body')"></div>
        <div class="request">
          <a class="animated" :href="siteEmail">{{ $t('send_request') }}</a>
        </div>
      </div>

      <contact-map></contact-map>

      <div class="col-md-8 offset-md-2">
        <div class="addresses">
          <div class="address" v-html="$t('address_zurich')" />
          <div class="address" v-html="$t('address_bolzano')" />
        </div>

        <social-links :icon="false"></social-links>
      </div>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import ContactMap from '@/components/elements/ContactMap'
  import SocialLinks from '@/components/elements/SocialLinks'
  import config from '@/config/app.json'

  export default {
    name: 'bworks_contact_block',

    extends: Node,

    computed: {
      siteEmail () {
        return 'mailto:' + config.siteEmail
      }
    },

    components: {
      ContactMap,
      SocialLinks
    },

    i18n: {
      messages: {
        en: {
          send_request: 'Send request',
          address_zurich: 'Advanced B-Works Technologies GmbH<br>Heinrichstrasse 267<br>8005 Zurich<br>Switzerland',
          address_bolzano: 'B-Works GmbH<br>Via Museo 41/A<br>39100 Bolzano<br>Italy'
        },
        de: {
          send_request: 'Anfrage senden',
          address_zurich: 'Advanced B-Works Technologies GmbH<br>Heinrichstrasse 267<br>8005 Zürich<br>Schweiz',
          address_bolzano: 'B-Works GmbH<br>Museumstrasse 41/A<br>39100 Bozen<br>Italien'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_contact_block {
    padding-top: calc(7rem + 4vh);

    h1 {
      border-bottom: 4px solid $brand-primary;

      @include media-breakpoint-up(sm) {
        max-width: 66%;
      }
    }

    .request {
      margin-top: 4rem;
      text-align: center;

      a {
        font-size: 1.28571rem;
      }
    }

    .addresses {
      .address {
        margin-bottom: 2rem;
      }

      @include media-breakpoint-up(sm) {
        display: flex;
        justify-content: space-around;

        .address {
          margin-left: 2rem;
          margin-right: 2rem;
        }
      }
    }

    .social-links {
      a {
        margin-right: 2rem;
      }
    }
  }
</style>
