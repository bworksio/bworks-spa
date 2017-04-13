<template>
  <div :class="'section node-' + getType() + ' ' + viewMode">
    <template v-if="viewMode === 'teaser'">
      <router-link class="unstyled" :to="projectUrl">
        <img :src="getField('field_image', 'url')">

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
      <div class="fp-background" :style="getNodeStyle">
        <template v-if="hasSlideshow">
          <flex-slider :images="getAllFields('field_image')"></flex-slider>
        </template>
        <div class="container">
          <h2>{{ getField('title') }}</h2>
          <div v-if="getField('field_subtitle', 'value', 0, false)" class="subtitle">{{ getField('field_subtitle') }}</div>
          <div class="body" v-html="getField('body', 'value')"></div>
          <div v-if="getField('field_link', 'uri', 0, false)" class="link">
            <a :href="getField('field_link', 'uri')">{{ getField('field_link', 'title', 0, '') }}</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'
  import FlexSlider from '../helpers/FlexSlider'
  import { cleanId } from '../../utils'

  export default {
    name: 'project',
    extends: Node,
    props: {
      // Index of item.
      index: {
        type: Number
      }
    },
    computed: {
      /**
       * Build url to specialties page.
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
      getNodeStyle () {
        if (!this.hasSlideshow) {
          let style = 'linear-gradient(to bottom left, rgba(0,0,0,.05), rgba(0,0,0,.5))'
          if (!this.hasVideo) {
            style += ', url(' + this.getField('field_image', 'url', 0, '') + ')'
          }
          return {
            'background-image': style
          }
        }
      },
      getVideoStyle () {
        return {
          'background-image': 'url(' + this.getField('field_image', 'url', 0, '') + ')',
          'background-size': 'cover'
        }
      },
      getImageFields () {
        return this.getAllFields('field_image')
      }
    },
    created () {
      this.cleanId = cleanId(this.getField('title'))
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
          .description-wrapper {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            min-height: 6rem;
            background-color: rgba(255,255,255,.75);
          }

          h2 {
            flex: 1 50%;
            padding-left: 8.3333%;
            padding-right: 4.1617%;
          }

          .description {
            flex: 1 50%;
            padding-right: 4.1617%;
          }

          .subtitle {
            margin-right: 8.3333%;
            padding-top: 4px;
            padding-right: 4.1617%;
            font-size: .857142rem;
            font-weight: $font-weight-bold;
            line-height: 1.16667;
            letter-spacing: .07167em;
            text-transform: uppercase;
            border-top: 1px solid $body-color;
          }

          .tags-wrapper {
            position: absolute;
            top: -3rem;
            right: 0;
            padding: 2rem 4rem 2rem 3rem;
            color: $white;
            background-color: transparentize($brand-primary, .1);
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
        max-height: 640px;
        object-fit: cover;
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
        margin: 1rem 0 2rem;
        font-size: .857142rem;
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

      .fp-background {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100vh;
        padding-top: 125px;
        padding-bottom: 65px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .container {
        align-self: flex-end;
        z-index: 10;
      }

      .subtitle {
        font-size: 1.57142rem;
        line-height: 1.36363;
        font-weight: $font-weight-bold;
        letter-spacing: .06681em;
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
    }
  }
</style>
