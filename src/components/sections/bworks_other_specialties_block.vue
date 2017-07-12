<template>
  <div :class="'node node-' + getType()">
    <div class="container-fluid">
      <h2>{{ $t('other_specialties') }}</h2>
      <ul class="row">
        <li v-for="specialty in node.field_specialities" class="col-sm-6">
          <bworks_speciality :nid="specialty.target_id" :lang="lang" viewMode="list"></bworks_speciality>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable camelcase */
  import Node from '@/components/nodes/Node'
  import bworks_speciality from '@/components/nodes/bworks_speciality'

  export default {
    name: 'bworks_other_specialties_block',

    extends: Node,

    props: {
      viewMode: String
    },

    components: {
      bworks_speciality
    },

    i18n: {
      messages: {
        en: {
          other_specialties: 'Take a look at other services'
        },
        de: {
          other_specialties: 'Unsere weiteren Services'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .node-bworks_other_specialties_block {
    .container-fluid {
      padding-top: 4rem;
      padding-bottom: 1rem;
      background-color: $gray-bg;
      text-align: center;
    }

    h2 {
      margin-bottom: 2rem;
    }

    svg {
      width: 100%;
      height: auto;
      max-width: 180px;

      [id^="Oval"] {
        fill: $white;
      }
    }
  }
</style>
