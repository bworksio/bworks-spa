<template>
  <transition name="fade">
    <div v-if="isLoading" id="preloading">
      <div v-html="assets.bWorksPreloading" class="logo"></div>
      <!--video playsinline autoplay poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" style="">
        <source src="static/Bworks-logoanimation.webm" type="video/webm">
        <source src="static/Bworks-logoanimation.mp4" type="video/mp4">
      </video-->
      <transition name="fade" appear>
        <div v-if="!error" class="loading delay">Loading</div>
      </transition>
      <transition name="fade">
        <div v-if="error" class="error">{{ error }}</div>
      </transition>
    </div>
  </transition>
</template>

<script type="text/javascript">
  export default {
    name: 'PreloadOverlay',

    data () {
      return {
        assets: {
          bWorksPreloading: require('!!raw-loader!assets/images/bworks-preloading.svg')
        }
      }
    },

    computed: {
      /** @var {Boolean} True while preloading data. */
      isLoading () {
        return !this.$store.state.initialized
      },

      /** @var {String} Returns the last error. */
      error () {
        return this.$store.getters.getError
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #preloading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    z-index: 999;

    video {
      width: 100%;
      height: 100%;
    }

    .logo {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 250px;
      }
    }

    .loading,
    .error {
      position: absolute;
      top: 75%;
      width: 100%;
      text-align: center;
    }

    .loading:after {
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4,end) 900ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0;
      margin-right: 1.25em;
    }

    @keyframes ellipsis {
      to {
        width: 1.25em;
        margin-right: 0;
      }
    }

    .error {
      color: red;
    }
  }
</style>
