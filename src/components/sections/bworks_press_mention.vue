<template>
  <div :class="'node-' + getType()">
    <h3 class="h2">{{ getField('title') }}</h3>
    <div class="body" v-html="quote(getField('body'))" />
    <div class="date" v-html="getField('field_date')" />
    <div class="link">
      <a v-if="file" :href="file">{{ $t('download') }}</a>
      <a v-else-if="link" :href="link">{{ $t('visit') }}</a>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Node from '../helpers/Node'

  export default {
    name: 'bworks_press_mention',

    extends: Node,

    computed: {
      file () {
        return this.getField('field_file', 'url', 0, false)
      },

      link () {
        return this.getField('field_link', 'uri', 0, false)
      }
    },

    methods: {
      /**
       * Typographical quotes
       * @param text
       * @returns {string}
       */
      quote (text) {
        console.log(this)
        switch (this.lang) {
          case 'de':
            return '„' + text + '“'
          case 'it':
            return '«' + text + '»'
          default:
            return '“' + text + '”'
        }
      }
    },

    i18n: {
      messages: {
        en: {
          download: 'Download PDF',
          visit: 'Visit site'
        },
        de: {
          visit: 'Seite anzeigen'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

  .node-bworks_press_mention {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: 2rem;
    margin-right: 4rem;

    h3 {
      color: $gray-color;
      text-transform: none;
    }

    .body {
      flex-basis: 100%;
      margin: 0;
      font-size: $font-size-h3;
      font-weight: $font-weight-bold;
      line-height: 1.38889;
      letter-spacing: .06667em;

      p {
        // Required for quotes
        display: inline;
      }
    }

    .date {
      margin-top: .5rem;
      margin-bottom: 1rem;
      font-size: $font-size-sm;
      color: $gray-color;
    }
  }
</style>
