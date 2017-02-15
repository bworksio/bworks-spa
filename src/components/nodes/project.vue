<template>
  <div :class="'node-' + getType() + ' ' + viewMode + (first ? ' first' : '')">
    <template v-if="viewMode === 'teaser'">
      <a class="unstyled" href="#">
        <img :src="getField('field_image', 'url')">

        <template v-if="!!first">
          <div class="description-wrapper row">
            <h2 class="col-sm-6">{{ getField('title') }}</h2>
            <div v-if="first" class="description col-sm-6">{{ getField('body', 'summary') }}</div>
          </div>
        </template>

        <template v-if="!first">
          <h2>{{ getField('title') }}</h2>
        </template>

      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <img :src="getField('field_image', 'url')">
      <h2>{{ getField('title') }}</h2>
      <div v-html="getField('body', 'value')"></div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  export default {
    name: 'project',
    extends: Node,
    props: {
      // Whether this is the first project in a list.
      first: {
        type: Boolean,
        default: false
      },
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_project {
    position: relative;
    margin-bottom: 30px;

    a {
      display: block;
    }

    img {
      width: 100%;
      height: auto;
    }

    &.teaser {
      .description-wrapper {
      }

      h2 {
        margin: .3em 0 .15em;
        color: $body-color;
      }

      .description {
        max-height: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @include media-breakpoint-up(sm) {
        &:first-child {
          .description-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 4rem;
            background-color: rgba(255,255,255,.75);
          }

          h2 {
            align-self: center;
            margin: 0;
            padding-left: 8.3333vw;
          }
        }
      }
    }
  }
</style>
