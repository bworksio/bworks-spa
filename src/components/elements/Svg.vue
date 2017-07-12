<template lang="html">
  <div class="icon" v-html="svg"></div>
</template>

<script type="text/javascript">
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
    beforeCreate () {
      Axios.get(this.$options.propsData.url, { baseURL: config.api.baseUrl })
        .then(result => {
          this.svg = result.data
        })
        .catch(() => {
          this.svg = require('!!raw-loader!assets/images/missing.svg')
        })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
