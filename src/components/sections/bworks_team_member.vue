<template>
  <div :class="'node node-' + getType()">
    <div class="photo-wrapper">
      <div class="overlay"></div>
      <drupal-image :image="node.field_photo[0]"></drupal-image>
    </div>
    <div class="info-wrapper">
      <div class="h2 forename">{{ getField('field_forename') }}</div>
      <div class="h2 surname">{{ getField('field_surname') }}</div>
      <div class="h3 position">{{ getField('field_position') }}</div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import DrupalImage from '../helpers/DrupalImage'

  export default {
    name: 'bworks_team_member',

    extends: Node,

    components: {
      DrupalImage
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_team_member {
    .photo-wrapper {
      position: relative;
      overflow: hidden;
    }

    img {
      position: relative;
      max-width: 100%;
      height: auto;
      filter: grayscale(100%);
      background-color: $brand-primary;
      background-blend-mode: multiply;
      z-index: 1;
    }

    @supports (mix-blend-mode: multiply) {
      .overlay {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: $brand-primary;
        mix-blend-mode: multiply;
        z-index: 2;
        transition: transform .4s;
      }
    }

    .info-wrapper {
      padding-top: .5rem;
      padding-bottom: 2rem;
      transform: translateY(-101%);
      transition: transform .4s;
    }

    .forename,
    .surname {
      margin: 0;
      text-transform: none;
    }

    .position {
      margin-top: .5rem;
      font-size: 1.14285rem;
      font-weight: $font-weight-normal;
      color: $body-color;
    }

    @include media-breakpoint-down(sm) {
      .forename,
      .surname {
        font-size: 1rem;
        line-height: 1.16667;
        letter-spacing: .1225em;
      }

      .position {
        font-size: .9375rem;
        line-height: 1.36363;
        letter-spacing: .07272em;
      }
    }

    &:focus,
    &:hover {
      .overlay {
        transform: translateX(101%);
      }

      .info-wrapper {
        transform: translateY(0);
      }
    }
  }
</style>
