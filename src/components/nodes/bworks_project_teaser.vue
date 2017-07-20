<template>
  <div :class="'node-' + getType() + ' ' + viewMode">
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
        <div class="tags-wrapper animation-wrapper animate-children">
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
  </div>
</template>

<script type="text/javascript">
  import Node from '@/components/nodes/Node'
  import ScrollMagicMixin from '@/components/mixins/ScrollMagicMixin'

  export default {
    name: 'bworks_project_teaser',
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
        return {
          name: route.name,
          params: { project: this.getCleanId(this.getField('title')) }
        }
      }
    },

    mounted () {
      const ScrollMagicScene = require('scrollmagic').Scene
      Array.from(this.$el.querySelectorAll('.animation-wrapper')).forEach((el) => {
        // Run html animations on enter.
        const options = {
          triggerElement: el,
          triggerHook: 'onEnter',
          offset: 50,
          reverse: false
        }
        this.addScrollMagicScene(new ScrollMagicScene(options))
          .setClassToggle(el, 'run')
      })
    },

    methods: {
      getTags () {
        const tags = []
        this.getAllFields('field_project_tags').forEach((value) => {
          tags.push(this.$store.getters.getTag(value.target_id, this.lang))
        })
        return tags
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  @keyframes kenburns-project {
    0% {
      opacity: .75;
    }
    5% {
      opacity: 1;
    }
    100% {
      transform: scale3d(1.09, 1.09, 1.09) translate3d(-4%, -4%, 0px);
      animation-timing-function: ease-in;
      opacity: 1;
    }
  }

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

      .image {
        position: relative;
        overflow: hidden;
      }

      img {
        height: 47vw;
        @include media-breakpoint-up(md) {
          height: 22.9vw;
        }
        object-fit: cover;
        opacity: 0;
        filter: saturate(50%) contrast(105%);
        transition: transform .2s ease-out, opacity .2s ease-out, filter .4s;

        @include hover-focus() {
          animation: kenburns-project 15s infinite;
          filter: saturate(75%) contrast(105%);
        }
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
  }
</style>
