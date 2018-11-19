<template>
  <div class="node node-bworks_careers_block">
    <div class="container">
      <div class="job-wrapper">
        <ul class="job-links row">
          <li v-for="(node, index) in nodes" class="col-md-6">
            <a href="#" :class="{active: index === active}" @click.prevent="show(index)"><span>{{ node.title[0].value }}</span></a>
          </li>
        </ul>

        <transition name="fade" mode="out-in">
          <div v-if="nodes[active]" :key="active" class="job-offer">
            <h3 class="h2">{{ $t('message.looking_for') }}</h3>
            <h2 class="h1">{{ nodes[active].title[0].value }}</h2>
            <h3 class="subtitle" :if="nodes[active].field_subtitle">{{ nodes[active].field_subtitle[0].value }}</h3>
            <div class="job-description" v-html="nodes[active].body[0].value"></div>
            <div class="apply">
              <a class="animated" :href="nodes[active].field_link[0].uri">{{ $t('button.apply_now') }}</a>
            </div>
            <ShareLinks type="text-only"></ShareLinks>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Node from '@/components/nodes/Node'
  import ShareLinks from '@/components/elements/ShareLinks'

  export default {
    name: 'bworks_careers_block',
    extends: Node,
    data () {
      return {
        nodes: [],
        active: 0
      }
    },
    created () {
      // Get all articles
      this.nodes = this.$store.getters.getNodesByType('bworks_job_offer', this.lang)
    },
    methods: {
      show (index) {
        this.active = index
      }
    },
    components: {
      ShareLinks
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .job-wrapper {
    @include media-breakpoint-up(md) {
      padding-left: 8.3333%;
      padding-right: 8.3333%;
    }
  }

  ul.job-links {
    > li {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: .5em;
      border-top: 1px solid $body-color;
      font-weight: 400;
      color: $body-color;

      span {
        padding-right: 1rem;
      }

      &:after {
        content: "•";
        color: transparent;
        transition: transform .2s;
      }

      &.active:after {
        color: $brand-primary;
        transform: scale(2);
      }

      @include hover-focus {
        color: $brand-primary;

        &:after {
          color: $brand-primary;
          transform: scale(2);
        }
      }
    }
  }

  .job-offer {
    margin-top: calc(2rem + 4vh);

    img {
      max-width: 100%;
      height: auto;
    }

    .subtitle {
      margin: -1rem 0 2rem;
      color: $body-color;
    }

    .apply {
      margin-top: 4rem;
      font-size: 1.21428rem;
      text-align: center;
    }
  }

  .job-description {
    h3 {
      margin: 3.5em 0 1.16667em;
      font-size: .9375rem;
      line-height: 1.166667;
      letter-spacing: .044167em;
      color: $body-color;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 1.14285rem;

      li {
        padding-left: 1.5em;

        &:before {
          content: "–";
          margin-left: -1.5em;
          padding-right: 1em;
        }
      }
    }
  }
</style>
