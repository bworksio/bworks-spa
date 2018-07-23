<template>
  <div :data-id="cleanId" :class="'section node-' + getType() + ' ' + viewMode">
    <div class="fp-background">
      <div v-if="!hasSlideshow && !hasVideo" class="bg-single" :style="'background-image: url(' + getField('field_image', 'url', 0, '') + ')'"></div>
      <template v-if="hasSlideshow">
        <flex-slider :images="getAllFields('field_image')"></flex-slider>
      </template>
      <div v-if="hasVideo" class="bg-video">
        <video playsinline loop muted controls="false" data-autoplay poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" :style="getVideoStyle">
          <!--source :src="getField('field_file', 'url')" type="video/webm"-->
          <source :src="getField('field_file', 'url')" type="video/mp4">
        </video>
      </div>
      <div class="bg-overlay"></div>
      <div class="container">
        <img v-if="getField('field_project_logo', 'url', 0, false)" :src="getField('field_project_logo', 'url')" class="logo">
        <h2>{{ getField('title') }}</h2>
        <div v-if="getField('field_subtitle', 'value', 0, false)" class="subtitle">{{ getField('field_subtitle') }}</div>
        <div class="body" v-html="getField('body', 'value')"></div>
        <div v-if="getField('field_link', 'uri', 0, false)" class="link">
          <a :href="getField('field_link', 'uri')">{{ getField('field_link', 'title', 0, '') }}</a>
        </div>
        <div v-if="getTags().length" class="approach-explanation">
          <div class="title">{{ $t('message.characteristics') }}</div>
          <div class="line">&nbsp;</div>
          <div class="explanation">
            <p v-for="tag in getTags()">{{ tag }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import FlexSlider from '@/components/elements/FlexSlider'

  export default {
    name: 'bworks_project_full',
    extends: Node,

    computed: {
      cleanId () {
        return this.getCleanId(this.getField('title'))
      },

      hasVideo () {
        return !!this.getField('field_file', 'url', 0, false)
      },

      hasSlideshow () {
        return this.getAllFields('field_image').length > 1
      },

      getVideoStyle () {
        return {
          'background-image': 'url(' + this.getField('field_image', 'url', 0, '') + ')'
        }
      }
    },

    methods: {
      getTags () {
        const tags = []
        this.getAllFields('field_project_tags').forEach((value) => {
          tags.push(this.$store.getters.getTag(value.target_id, this.lang))
        })
        return tags
      }
    },

    components: {
      FlexSlider
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_project {
    position: relative;

    a {
      display: block;
      position: relative;
    }

    img {
      width: 100%;
      height: auto;
    }

    &.full {
      background-color: $body-color;
      color: $white;

      h1, h2, h3, h4,
      .h1, .h2, .h3, .h4,
      a {
        color: $white;
      }

      .bg-single {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .fp-background {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100vh;
        padding-top: 125px;
        padding-bottom: 65px;
      }

      .container {
        align-self: flex-end;
        z-index: 10;
      }

      .logo {
        width: auto;
        margin-bottom: 2rem;
      }

      .subtitle {
        font-size: 1.57142rem;
        line-height: 1.36363;
        font-weight: $font-weight-bold;
        letter-spacing: .06681em;
        margin-bottom: 2rem;
      }

      .body {
        margin-top: 2rem;
        max-width: 50%;

        &,
        & p {
          line-height: 1.78571;
          letter-spacing: .08071em;
        }
      }

      .approach-explanation {
        .title {
          color: $white;
        }

        .line {
          width: 8.3333%;
        }
      }
    }
  }
</style>
