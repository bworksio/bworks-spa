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

        if(currentRoute === "blog_article") {
          // Data used for blog_article should be taken from Nodes (not from Route or Queue).
          const currentNode = this.$store.getters.getNodeByPath("/blog/" + this.$route.params.name, this.$route.matched[0].props.default.lang);
          if (currentNode.path) {

            // Get path for current language.
            const item = currentNode.path[0];

            // Get path for other language.
            const otherLang = item.langcode === 'de' ? 'en' : 'de';
            const currentNodeOtherLang = this.$store.getters.getNode(currentNode.nid[0].value, otherLang);
            const itemOtherLang = currentNodeOtherLang.path[0];

            // Keep DE to be first in LanguageSwitcher when is used in blog_article.
            if(item.langcode === "de") {
              links.push({path: item.alias, title: item.langcode.toUpperCase()});
              links.push({path: "/en" + itemOtherLang.alias, title: itemOtherLang.langcode.toUpperCase()});
            }
            else {
              links.push({path: itemOtherLang.alias, title: itemOtherLang.langcode.toUpperCase()});
              links.push({path: "/en" + item.alias, title: item.langcode.toUpperCase()});
            }
          }
        }
        else {
          if (currentRoute) {
            forEach(routesConfig[currentRoute], (item, lang) => {
              if (config.activeLanguages.indexOf(lang) !== -1) {
                // Modify *a copy* of the router item.
                links.push(merge(item, {title: lang.toUpperCase()}));
              }
            })
          } else {
            // If can't get appropriate values from Route, then get it from Queue.
            const currentQueue = this.$store.getters.getQueueByPath(this.$route.params[0], this.$route.matched[0].props.default.lang);
            if (currentQueue.path) {
              forEach(currentQueue.path, (item, lang) => {
                links.push({path: item, title: lang.toUpperCase()});
              })
            }
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
