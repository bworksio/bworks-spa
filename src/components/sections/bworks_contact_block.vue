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

      <gmap-map :center="{lat: 46.5248, lng: 9.9337}" :zoom="7" :options="{styles}" >
        <gmap-marker :position="{lat: 47.3664, lng: 8.4921}"></gmap-marker>
        <gmap-marker :position="{lat: 46.4999, lng: 11.3497}"></gmap-marker>
      </gmap-map>

      <div class="col-sm-8 offset-sm-2">
        <div class="addresses">
          <div class="address">
            Birmensdorferstrasse 541<br>
            8055 Zürich<br>
            Schweiz
          </div>
          <div class="address">
            Museumstrasse 41/A<br>
            39100 Bozen<br>
            Italien
          </div>
        </div>

        <social-links :icon="false"></social-links>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import SocialLinks from '../helpers/SocialLinks'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import config from '../../config/app.json'

  Vue.use(VueGoogleMaps, {
    load: {
      key: config.googleApiKey
    }
  })

  export default {
    name: 'bworks_contact_block',

    extends: Node,

    data () {
      return {
        // @see https://snazzymaps.com/editor/customize/25
        /* eslint-disable quotes */
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#444444"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#4b7fe2"
              },
              {
                "visibility": "on"
              }
            ]
          }
        ]
      }
    },

    components: {
      SocialLinks
    },

    i18n: {
      messages: {
        en: {
          send_request: 'Send request'
        },
        de: {
          send_request: 'Anfrage senden'
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

    .vue-map-container {
      margin-top: 4rem;
      margin-bottom: 4rem;
      height: 30rem;
    }

    .addresses {
      display: flex;
      justify-content: space-around;
    }

    .social-links {
      a {
        margin-right: 2rem;
      }
    }
  }
</style>
