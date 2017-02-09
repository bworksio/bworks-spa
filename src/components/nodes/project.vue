<template>
  <div :class="'node-' + node.type[0].target_id + ' ' + viewMode + (first ? ' first' : '')">
    <template v-if="viewMode === 'teaser'">
      <a class="unstyled" href="#">
        <img :src="node.field_image[0].url">

        <template v-if="!!first">
          <div class="description-wrapper row">
            <h2 class="col-sm-6">{{ node.title[0].value }}</h2>
            <div v-if="first" class="description col-sm-6">{{ node.body[0].summary }}</div>
          </div>
        </template>

        <template v-if="!first">
          <h2>{{ node.title[0].value }}</h2>
        </template>

      </a>
    </template>

    <template v-if="viewMode === 'full'">
      <img :src="node.field_image[0].url">
      <h2>{{ node.title[0].value }}</h2>
      <div v-html="node.body[0].value"></div>
    </template>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'project',
    props: {
      // Node id of the project
      nid: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      },
      first: {
        type: Boolean,
        default: false
      },
      // View mode, teaser or full
      viewMode: {
        type: String,
        default: 'full'
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
