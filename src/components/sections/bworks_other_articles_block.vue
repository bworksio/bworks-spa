<template>
  <div :class="'node node-bworks_other_articles_block'">
    <div class="container-fluid">
      <h2>{{ $t('other_posts') }}</h2>
      <ul class="row">
        <li v-for="node in nodes" class="col-sm-6 col-md-4">
          <bworks_article :nid="node.nid[0].value" :lang="lang" viewMode="list"></bworks_article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable camelcase */
  import bworks_article from '@/components/nodes/bworks_article'

  export default {
    name: 'bworks_other_articles_block',

    props: {
      // Language
      lang: {
        type: String,
        required: true
      },
      nodes: {
        type: Array,
        required: true
      }
    },

    components: {
      bworks_article
    },

    i18n: {
      messages: {
        en: {
          other_posts: 'Other posts'
        },
        de: {
          other_posts: 'Weitere Artikel'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_other_articles_block {
    .container-fluid {
      padding-top: 4rem;
      padding-bottom: 1rem;
      background-color: $gray-bg;

      > h2 {
        margin-bottom: 2rem;
        padding-left: 8.3333%;
      }
    }
  }
</style>
