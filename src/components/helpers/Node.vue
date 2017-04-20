<template lang="html"></template>

<script type="text/javascript">
  import config from '../../config/app.json'

  /**
   * Abstract Drupal Node.
   */
  export default {
    name: 'Node',

    props: {
      // Language
      lang: {
        type: String,
        required: true
      },
      // Node id
      nid: {
        type: String,
        required: true
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

    computed: {
      /**
       * Check whether the node has been loaded.
       */
      isLoaded () {
        return Object.keys(this.node).length !== 0 && !this.node.hasOwnProperty('error')
      }
    },

    methods: {
      /**
       * Returns all field items from the node object.
       *
       * @param {string} name The field name
       * @param {*} [defaultValue=[]] The default value
       */
      getAllFields (name, defaultValue = []) {
        return name in this.node ? this.node[name] : defaultValue
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
        if (name in this.node && this.node[name][index]) {
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
        return markup.replace(/\ssrc="(\/[^/"][^"]+)"/g, (match, url) => {
          return match.replace(url, config.api.baseUrl + url.substr(1))
        })
      }
    },

    created () {
      this.node = this.$store.getters.getNode(this.nid, this.lang)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
