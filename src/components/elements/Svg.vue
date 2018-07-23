<template lang="html">
  <div class="icon" v-html="svg"></div>
</template>

<script>
  import config from '@/config/app.json'
  import Axios from 'axios'

  /**
   * Inlines a (remote) SVG file.
   */
  export default {
    name: 'SVG',
    // Component properties/variables
    props: {
      url: {
        type: String,
        required: true,
        validator (value) {
          return value !== ''
        }
      }
    },
    // Variables
    data () {
      return {
        svg: ''
      }
    },
    // Component lifecycle hooks
    mounted () {
      Axios.get(this.url + '.remote', { baseURL: config.api.baseUrl })
        .then(result => {
          this.svg = result.data
        })
        .catch(() => {
          this.svg = require('!!raw-loader!assets/images/missing.svg')
        })
    }
  }
</script>

<style lang="scss"></style>
