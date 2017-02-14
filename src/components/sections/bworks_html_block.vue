<template>
  <div :class="'node node-' + getType()">
    <div class="container">
      <div v-html="getField('body')"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'

  export default {
    name: 'bworks_html_block',
    extends: Node
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
      width: 100%;
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
