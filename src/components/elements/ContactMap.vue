<template>
  <gmap-map :center="{lat: 47.1, lng: 9.9}" :zoom="7" :options="options">
    <gmap-marker :position="{lat: 47.3664, lng: 8.4921}" :clickable="true" @click="go('https://www.google.com/maps/dir/Birmensdorferstrasse+541,+8055+Z%C3%BCrich,+Schweiz/')"></gmap-marker>
    <gmap-marker :position="{lat: 46.4999, lng: 11.3497}" :clickable="true" @click="go('https://www.google.com/maps/dir/Museumstrasse+41A,+39100+Bozen,+Italien/')"></gmap-marker>
  </gmap-map>
</template>

<script>
  import Vue from 'vue'
  import * as GoogleMaps from 'vue2-google-maps'
  import config from '@/config/app.json'
  import googleMapsStyles from '@/config/google-maps-styles'

  Vue.use(GoogleMaps, {
    load: { key: config.googleApiKey },
    installComponents: false
  })

  Vue.component('GmapMap', GoogleMaps.Map)
  Vue.component('GmapMarker', GoogleMaps.Marker)

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
          styles: googleMapsStyles
        }
      }
    },

    methods: {
      go (url) {
        window.open(url, '_blank')
      }
    },

    mounted () {
      if (typeof google !== 'undefined') {
        /* global google */
        // Keep map centered on window resize
        google.maps.event.addDomListener(window, 'resize', () => this.$children[0].resizePreserveCenter())
      }
    }
  }
</script>

<style lang="scss">
  .vue-map-container {
    margin-top: 4rem;
    margin-bottom: 4rem;
    height: 27rem;
  }
</style>
