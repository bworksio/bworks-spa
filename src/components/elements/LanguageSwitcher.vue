<template>
  <nav class="language-switcher">
    <ul>
      <li v-for="link in links">
        <router-link :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import config from '@/config/app.json'
  import routesConfig from '@/config/routes'
  const forEach = require('axios/lib/utils.js').forEach
  const merge = require('axios/lib/utils.js').merge

  export default {
    name: 'LanguageSwitcher',
    data () {
      return {
        links: []
      }
    },
    created () {
      this.fetchLinks()
    },
    watch: {
      '$route' (to, from) {
        this.fetchLinks()
      }
    },
    methods: {
      fetchLinks () {
        let links = [];
        const currentRoute = this.$route.meta.name;
        if (currentRoute) {
          forEach(routesConfig[currentRoute], (item, lang) => {
            if (config.activeLanguages.indexOf(lang) !== -1) {
              // Modify *a copy* of the router item.
              links.push(merge(item, {title: lang.toUpperCase()}));
            }
          })
        }
        else {
          // If can't get appropriate values from Route, then get it from Queue.
          const currentQueue = this.$store.getters.getQueueByPath(this.$route.params[0], this.$route.matched[0].props.default.lang);
          if (currentQueue.path) {
            forEach(currentQueue.path, (item, lang) => {
              links.push({path: item, title: lang.toUpperCase()});
            })
          }
        }
        this.links = links;
      }
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/mixins';

  .language-switcher {
    ul {
      display: flex;
      justify-content: space-around;
    }

    // Invert link colors
    a {
      margin: 0 .25rem;
      padding: .5rem;
      color: $white;
      text-decoration: underline;

      &.animated {
        &:before {
          background-color: $white;
        }

        @include hover-focus {
          color: $body-color;
        }
      }
    }
  }
</style>
