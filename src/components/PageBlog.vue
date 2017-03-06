<template>
  <div id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
    <div :class="'node node-' + getType() + ' full'">
      <div class="container">
        <h1 class="col-md-10 offset-md-1">{{ getField('title') }}</h1>
        <div class="col-md-10 offset-md-1" v-html="getField('body')"></div>
      </div>
    </div>

    <bworks_footer v-if="Object.keys(footerNode).length" :nid="footerNode.nid[0].value" :lang="lang"></bworks_footer>
  </div>
</template>

<script type="text/javascript">
  import { getData } from '../store'
  import config from '../config/app.json'
  /* eslint-disable camelcase */
  import bworks_footer from './sections/bworks_footer'

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
          this.footerNode = this.$store.getters.getNodesByType('bworks_footer', this.lang).shift()
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
        return markup.replace(/\ssrc="(\/[^"]+)"/, (match, url) => {
          return match.replace(url, config.api.baseUrl + url.substr(1))
        })
      }
    },
    components: {
      bworks_footer
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../assets/scss/mixins';

  .page-blog {
    padding-top: 14rem;

    h1 {
      color: $body-color;
    }
  }
</style>
