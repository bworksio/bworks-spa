<template>
  <div :class="'node node-' + getType()"
    :style="{ 'background-image': 'url(' + getField('field_header_image', 'url') + ')' }">
    <div class="container">
      <div class="intro-text-container">
        <div class="intro-text-wrapper">
          <h1>{{ getField('title') }}</h1>
          <div class="intro-text" v-html="getField('body')"></div>
        </div>
      </div>
      <div class="language-switcher-wrapper">
        <app-language-switcher></app-language-switcher>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import AppLanguageSwitcher from 'components/AppLanguageSwitcher'

  export default {
    name: 'bworks_basic_page',
    extends: Node,
    components: {
      AppLanguageSwitcher
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_basic_page {
    background-position: center;
    background-size: cover;
    border-bottom: 8px solid $brand-primary;

    .intro-text-container {
      display: flex;
      align-items: flex-end;
      padding-bottom: 68px;

      @include media-breakpoint-only(xs) {
        min-height: 667px;
      }
      @include media-breakpoint-only(sm) {
        min-height: 375px;
        padding-bottom: 40px;
      }
      @include media-breakpoint-only(md) {
        min-height: 1024px;
        align-items: center;
      }
      @include media-breakpoint-only(lg) {
        min-height: 768px;
      }
      @include media-breakpoint-only(xl) {
        min-height: 800px;
      }
      @include media-breakpoint-up(xxl) {
        min-height: 903px;
      }
    }

    .intro-text-wrapper {
      @include media-breakpoint-only(md) {
        padding-left: 8.3333333%;
        padding-right: 8.3333333%;
      }
      @include media-breakpoint-up(lg) {
        max-width: 55%;
      }
    }

    h1, .h1 {
      font-size: 1.428571429rem;
      line-height: 1.35;
      letter-spacing: .0665em;
      text-shadow: 0 0 2rem rgba(0, 0, 0, .4);

      @include media-breakpoint-up(md) {
        font-size: 2rem;
        line-height: 1.357142857;
        letter-spacing: .066785714em;
      }
    }

    .intro-text p {
      font-weight: 900;
      font-size: 1.285714286rem;
      line-height: 1.222222222;
      letter-spacing: .18em;
      color: $white;
      text-shadow: 0 0 2rem rgba(0,0,0,.4);

      @include media-breakpoint-up(md) {
        font-size: 1.428571429rem;
        line-height: 1.4;
        letter-spacing: .18em;
      }

      // Overrule bold style
      b, strong {
        font-weight: 900;
      }
    }

    .language-switcher-wrapper {
      position: absolute;

      @include media-breakpoint-down(sm) {
        display: none;
      }
      @include media-breakpoint-up(md) {
        right: 8.3333vw;
        bottom: 7.285714286rem;
      }
      @include media-breakpoint-up(lg) {
        bottom: 5.92857142rem;
      }
    }
  }
</style>
