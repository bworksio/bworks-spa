<template>
  <div class="flexslider">
    <ul class="slides">
      <li v-for="image in images">
        <div class="image" :style="getImageStyle(image)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import 'flexslider/flexslider.css'

  export default {
    name: 'PureSlider',

    props: {
      images: {
        type: Array,
        required: true
      }
    },

    methods: {
      getImageStyle (image) {
        const style = 'linear-gradient(to bottom left, rgba(0,0,0,.05), rgba(0,0,0,.5)), url(' + image.url + ')'
        return {
          'background-image': style
        }
      }
    },

    mounted () {
      require('script-loader!flexslider')

      jQuery(this.$el).flexslider({
        slideshowSpeed: 6000,
        initDelay: 500,
        fadeFirstSlide: false,
        touch: false,
        controlNav: false,
        directionNav: false,
        keyboard: false
      })
      // FIXME Something seems to trigger play again
      jQuery(this.$el).flexslider('stop')
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .flexslider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    border: none;

    .image {
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>
