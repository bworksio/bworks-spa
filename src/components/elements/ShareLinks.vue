<template lang="html">
  <div class="share-links">
    <h3>Share</h3>
    <div :class="'addthis_inline_share_toolbox ' + type"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'ShareLinks',
    props: {
      type: { type: String, default: 'text-only' }
    },
    mounted () {
      if (window.hasOwnProperty('addthis') && window.addthis.layers && window.addthis.layers.refresh) {
        window.addthis.layers.refresh()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixins.scss";

  .share-links {
    h3 {
      margin: 6rem 0 1em;
      font-size: $font-size-h3;
      color: $brand-primary !important;
    }

    .at-resp-share-element .at-share-btn {
      &:first-child {
        margin-left: 0;
        padding-left: 0;
      }

      svg {
        fill: $gray-color !important;
      }

      &:focus,
      &:hover {
        transform: translateY(0);

        svg {
          fill: $body-color !important;
        }
      }

      .at-label {
        font-family: $font-family-base;
        font-size: .9375rem !important;
        letter-spacing: .066667em;
        font-weight: 400 !important;
        text-transform: uppercase;
      }
    }

    .logo-only {
      .at-share-btn {
        width: 8.333%;
      }

      span.at-icon-wrapper,
      svg.at-icon {
        width: 28px !important;
        height: 28px !important;
        line-height: 28px !important;
      }

      .at-label {
        display: none;
      }
    }

    .text-only {
      span.at-icon-wrapper {
        display: none;
      }

      .at-share-btn {
        &:first-child {
          .at-label {
            margin-left: 0;
          }
        }

        &:focus,
        &:hover {
          .at-label {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
