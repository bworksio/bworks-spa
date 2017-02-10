<template lang="html">
  <div v-html="svg"></div>
</template>

<script type="text/javascript">
  import config from '../../config/app.json'
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
        required: true
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
      const url = this.$options.propsData.url
      if (!url) {
        throw new Error('"url" must not be empty')
      }
      if (url[0] === '.') {
        this.svg = require('!!raw!' + url)
      } else {
        Axios.get(url, { baseURL: config.api.baseUrl })
          .then(result => {
            this.svg = result.data
          })
          .catch(() => {
            this.svg = require('!!raw!./missing.svg')
          })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
