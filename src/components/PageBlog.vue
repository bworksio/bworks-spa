<template>
  <div id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
    <div :class="'node node-' + getType() + ' full container'">
      <div class="row">
        <div class="title col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h1>{{ getField('title') }}</h1>
          <div class="meta">
            <div class="category">{{ getTag() }}</div>
            <div class="date">{{ getField('field_date') }}</div>
          </div>
        </div>
        <div class="body col-lg-10 offset-lg-1" v-html="getField('body')"></div>
        <div class="col-md-10 offset-md-1">
          <ShareLinks type="logo-only"></ShareLinks>
        </div>
      </div>
    </div>

    <bworks_other_articles_block :nodes="otherArticles" :lang="lang"></bworks_other_articles_block>
    <bworks_footer v-if="Object.keys(footerNode).length" :nid="footerNode.nid[0].value" :lang="lang"></bworks_footer>
  </div>
</template>

<script type="text/javascript">
  import { getData } from '@/store'
  import config from '@/config/app.json'
  import ShareLinks from '@/components/elements/ShareLinks'
  import unserialize from 'locutus/php/var/unserialize'
  /* eslint-disable camelcase */
  import bworks_other_articles_block from '@/components/sections/bworks_other_articles_block'
  import bworks_footer from '@/components/sections/bworks_footer'

  export default {
    name: 'PageBlog',

    props: {
      // Page name from route
      // @see ../router/index.js
      name: {
        type: String,
        required: true
      },
      // Language from route
      lang: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        node: {},
        otherArticles: [],
        footerNode: {}
      }
    },

    created () {
      // Update nodes to display for the current queue name.
      this.fetchData()
    },

    watch: {
      '$route' (to, from) {
        this.fetchData()
      }
    },

    methods: {
      /**
       * Fetches the list of nodes in the current queue to display.
       */
      fetchData () {
        // FIXME Resetting node list is required, otherwise DOM doesn't re-render on $route change.
        this.node = {}
        getData(this.lang).then(() => {
          // Find matching node by path
          this.node = this.$store.getters.getNodeByPath(this.$route.path, this.lang)
          // Find first footer node
          this.footerNode = this.$store.getters.getNodesByType('bworks_footer', this.lang).shift()
          // Find two newest articles, excluding this node
          this.otherArticles = this.$store.getters.getNodesByType('bworks_article', this.lang).sort((a, b) => {
            if (a.field_date[0].value < b.field_date[0].value) {
              return -1
            }
            if (a.field_date[0].value > b.field_date[0].value) {
              return 1
            }
            return 0
          })
          .filter(node => node.nid[0].value !== this.node.nid[0].value)
          .slice(0, 2)

          // Set page title
          let meta = this.getField('field_meta_tags', 'value', 0, false)
          if (meta) {
            meta = unserialize(meta)
            if (meta.title) {
              document.title = meta.title
            }
            if (meta.description) {
              const el = document.createElement('meta')
              el.name = 'description'
              el.content = meta.description
              document.getElementsByTagName('head')[0].appendChild(el)
            }
          } else {
            document.title = this.getField('title')
          }

          // Emit trigger event for webpack prerender_spa_plugin
          window.setTimeout(() => {
            /* global Event */
            document.dispatchEvent(new Event('prerender'))
          }, 100)
        }).catch(() => {
          /* Error handled upstream */
        })
      },

      /**
       * Returns all field items from the node object.
       *
       * @param {string} name The field name
       * @param {*} [defaultValue=[]] The default value
       */
      getAllFields (name, defaultValue = []) {
        return this.node.hasOwnProperty(name) ? this.node[name] : defaultValue
      },

      /**
       * Returns a field value from the node object.
       *
       * @param {string} name The field name
       * @param {string} [property=value] The field item property
       * @param {number} [index=0] The field item index
       * @param {*} [defaultValue=Missing] The default value to return if the field is unset
       * @returns {*} The field value
       */
      getField (name, property = 'value', index = 0, defaultValue = 'Missing') {
        if (this.node.hasOwnProperty(name) && this.node[name][index]) {
          const fieldItem = this.node[name][index]
          // If the field has a format property, assume it is of type "Text (formatted)"
          // and pipe it though fixUrls() to look for relative urls.
          return 'format' in fieldItem ? this.fixUrls(fieldItem[property]) : fieldItem[property]
        }
        return defaultValue
      },

      /**
       * Returns the node type.
       *
       * @returns {string} The node type
       */
      getType () {
        return this.getField('type', 'target_id')
      },

      /**
       * Fix relative urls to point to configured backend domain.
       *
       * @param {string} markup The markup to process
       * @returns {string} The processed markup
       */
      fixUrls (markup) {
        // Look for img src urls that start with a slash.
        return markup.replace(/\ssrc="(\/[^/"][^"]+)"/, (match, url) => {
          return match.replace(url, config.api.baseUrl + url.substr(1))
        })
      },

      /**
       * Returns the (first) tag for the current node.
       * @returns {string}
       */
      getTag () {
        const id = this.getField('field_tags', 'target_id', 0, false)
        return id ? this.$store.getters.getTag(id, this.lang) : this.$t('message.blog')
      }
    },

    components: {
      ShareLinks,
      bworks_other_articles_block,
      bworks_footer
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_article {
    &.full {
      padding-top: 10rem;

      @include media-breakpoint-down(sm) {
        .meta {
          display: flex;
          justify-content: space-between;
        }
      }

      @include media-breakpoint-only(sm) {
        .category {
          flex-basis: 66%;
        }
        .date {
          flex-basis: 33%;
        }
      }

      @include media-breakpoint-up(md) {
        .category {
          margin-bottom: 2.14285rem;
        }

        .html-wrapper {
          padding-left: 8.3333%;
          padding-right: 8.3333%;
        }
      }

      @include media-breakpoint-up(lg) {
        .title {
          display: flex;

          h1 {
            flex-basis: 75%;
            padding-right: 25px;
          }

          .meta {
            flex-basis: 25%;
            text-align: right;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 2.14285rem;
          }

          .category {
            margin-bottom: 0;
          }
        }
      }

      .title {
        margin-bottom: 4rem;
      }

      .category {
        font-weight: $font-weight-bold;
        color: $gray-color;
        text-transform: uppercase;
      }
    }

    h1, h3 {
      color: $body-color;
    }

    @include media-breakpoint-down(sm) {
      h1 {
        font-size: 1.28571rem;
        line-height: 1.38889;
        letter-spacing: .06667em;
      }
    }
  }
</style>
