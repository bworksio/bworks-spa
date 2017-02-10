<template lang="html">
  <div v-html="svg"></div>
</template>

<script type="text/javascript">
  import config from '../../config/app.json'
  import Axios from 'axios'

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
      Axios.get(this.$options.propsData.url, { baseURL: config.api.baseUrl })
        .then(result => {
          this.svg = result.data
        })
        .catch(() => {
          this.svg = require('!!raw!./missing.svg')
        })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
