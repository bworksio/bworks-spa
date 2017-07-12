<template>
  <gmap-map :center="{lat: 47.1, lng: 9.9}" :zoom="7" :options="options">
    <gmap-marker :position="{lat: 47.3664, lng: 8.4921}" :clickable="true" @click="go('https://www.google.com/maps/dir/Birmensdorferstrasse+541,+8055+Z%C3%BCrich,+Schweiz/')"></gmap-marker>
    <gmap-marker :position="{lat: 46.4999, lng: 11.3497}" :clickable="true" @click="go('https://www.google.com/maps/dir/Museumstrasse+41A,+39100+Bozen,+Italien/')"></gmap-marker>
  </gmap-map>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import config from '@/config/app.json'

  Vue.use(VueGoogleMaps, {
    load: {
      key: config.googleApiKey
    }
  })

  export default {
    name: 'ContactMap',

    data () {
      return {
        options: {
          scrollwheel: false,
          mapTypeControl: false,
          streetViewControl: false,
          minZoom: 7,
          maxZoom: 13,
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
      }
    },

    methods: {
      go (url) {
        window.open(url, '_blank')
      }
    },

    mounted () {
      if (!this.$store.state.isPhantom) {
        /* global google */
        // Keep map centered on window resize
        google.maps.event.addDomListener(window, 'resize', () => this.$children[0].resizePreserveCenter())
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .vue-map-container {
    margin-top: 4rem;
    margin-bottom: 4rem;
    height: 27rem;
  }
</style>
