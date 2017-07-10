<template>
  <div :data-id="cleanId" :class="'section node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <router-link class="unstyled" :to="projectUrl">
        <div class="image animation-wrapper">
          <img :src="getField('field_image', 'url')">
        </div>

        <template v-if="index === 0">
          <div class="description-wrapper">
            <h2>{{ getField('title') }}</h2>
              <div class="description">{{ getField('body', 'summary') }}</div>
              <div class="subtitle">{{ getField('field_subtitle') }}</div>
          </div>
          <div class="tags-wrapper">
            <ul>
              <li v-for="tag in getTags()">{{ tag }}</li>
            </ul>
          </div>
        </template>

        <template v-else>
          <div class="description-wrapper">
            <h2>{{ getField('title') }}</h2>
            <div class="tags-wrapper">
              <ul>
                <li v-for="tag in getTags()">{{ tag }}</li>
              </ul>
            </div>
          </div>
        </template>
      </router-link>
    </template>

    <template v-if="viewMode === 'full'">
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
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from './Node'
  import ScrollMagic from 'scrollmagic'
  import ScrollMagicMixin from '../elements/ScrollMagicMixin'
  import FlexSlider from '../elements/FlexSlider'
  import { forEach, cleanId } from '../../utils'

  export default {
    name: 'bworks_project',
    extends: Node,
    mixins: [ScrollMagicMixin],

    props: {
      // Index of item.
      index: {
        type: Number
      }
    },

    computed: {
      /**
       * Build url to projects page.
       * @returns {string}
       */
      projectUrl () {
        const route = this.$router.options.getRouteByProps('works', this.lang)
        return route.path + '#' + this.cleanId
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
      },

      getImageFields () {
        return this.getAllFields('field_image')
      }
    },

    created () {
      this.cleanId = cleanId(this.getField('title'))
    },

    mounted () {
      if (!this.$store.state.isPhantom) {
        forEach(this.$el.querySelectorAll('.html-container, .image'), (el) => {
          // Run html animations on enter.
          const options = {
            triggerElement: el,
            triggerHook: 'onEnter',
            offset: 50,
            reverse: false
          }
          this.addScrollMagicScene(new ScrollMagic.Scene(options)
          .setClassToggle(el, 'run')
          .addTo(this.$store.state.scrollMagicMainController))
        })
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

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

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

    &.teaser {
      margin-bottom: 30px;

      .description {
        display: none;
      }

      @include media-breakpoint-up(md) {
        @include make-gutters();
        width: 50%;

        .description {
          display: block;
        }
      }

      &:first-child {
        width: 100%;
        padding-top: 2rem;

        @include media-breakpoint-down(md) {
          .subtitle {
            display: none;
          }
        }

        @include media-breakpoint-up(md) {
          img {
            height: 37.5vw;
          }

          .description-wrapper {
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 6rem;
            background-color: rgba(255,255,255,.75);
          }

          h2 {
            flex: 1 50%;
            margin: 1.5rem 0;
            padding-left: 8.3333%;
            padding-right: 4.1617%;
          }

          .description {
            flex: 1 50%;
            margin: 2rem 0;
            padding-right: 4.1617%;
          }

          .subtitle {
            margin: 1.5rem 8.3333% 1.5rem 0;
            padding-top: 4px;
            padding-right: 4.1617%;
            font-size: .9375rem;
            font-weight: $font-weight-bold;
            line-height: 1.16667;
            letter-spacing: .07167em;
            text-transform: uppercase;
            border-top: 1px solid $body-color;
          }

          .tags-wrapper {
            position: absolute;
            top: -3rem;
            right: -1.5rem;
            padding: 2rem 4rem 2rem 3rem;
            color: $white;
            background-color: transparentize($brand-primary, .025);
          }
        }

        @include media-breakpoint-up(lg) {
          h2 {
            flex: 1 40%;
          }

          .description {
            flex: 1 40%;
          }

          .subtitle {
            display: block;
            flex: 1 12%;
          }
        }
      }

      &:not(:first-child) {
        @include media-breakpoint-up(lg) {
          .description-wrapper {
            display: flex;
          }

          h2 {
            flex-basis: 70%;
            margin: 1.5rem 0 1rem;
            padding-left: 25px;
            padding-right: 25px;
          }

          .tags-wrapper {
            flex-basis: 30%;
            text-align: right;
          }
        }
      }

      img {
        height: 47vw;
        @include media-breakpoint-up(md) {
          height: 22.9vw;
        }
        object-fit: cover;
        filter: saturate(50%) contrast(105%);
      }

      h2 {
        margin: .3em 0 .15em;
        color: $body-color;
      }

      .description {
        max-height: 4rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tags-wrapper {
        margin: 1.5rem 0 2rem;
        font-size: .9375rem;
        font-weight: $font-weight-bold;
        line-height: 1.16667;
        letter-spacing: .044167em;
        text-transform: uppercase;

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      }
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
