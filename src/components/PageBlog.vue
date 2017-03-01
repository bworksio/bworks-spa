<template>
  <div id="page" :class="'page-' + name + ' lang-' + lang" :key="lang +'/'+ name">
    <div class="container">
      <h1 class="col-md-10 offset-md-1">{{ getField('title') }}</h1>
      <div class="col-md-10 offset-md-1" v-html="getField('body')"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { getData } from '../store'
  import config from '../config/app.json'

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
        node: {}
      }
    },
    computed: {
      /** @var {String} The view mode for contents to display, 'teaser' on home page, 'full' otherwise */
      viewMode () {
        return this.$route.meta.name === 'blog-overview' ? 'teaser' : 'full'
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
    components: {}
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
