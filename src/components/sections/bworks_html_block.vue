<template>
  <div :class="'node node-' + node.type[0].target_id">
    <div class="container">
      <div v-html="node.body[0].value"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'bworks_html_block',
    props: {
      // Node id of the section
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        node: {}
      }
    },
    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_html_block {
    padding-top: 4rem;

    .promo-wrapper {
      @include media-breakpoint-up(sm) {
        &:nth-child(2) {
          margin-top: 4rem;
        }
      }
      @include media-breakpoint-up(lg) {
        float: left;
        width: 40%;

        &:nth-child(2) {
          margin-top: 0;
          padding-left: 20%;
        }
      }
    }

    footer {
      margin-top: 2.142857143rem;

      @include media-breakpoint-up(sm) {
        margin-top: 4rem;
      }

      .body {
        text-align: center;
      }
    }

    .line {
      display: block;
      width: 8.333333333vw;
      height: 1px;
      background-color: $body-color;
      margin-bottom: .428571429rem;
    }
  }
</style>
