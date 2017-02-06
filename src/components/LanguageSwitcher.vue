<template>
  <div class="language-switcher">
    <ul>
      <li v-for="link in links">
        <router-link :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import utils from '../utils'
  import routerConfig from '../config/routes'

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
        let links = []
        const currentRoute = this.$route.meta.name
        if (currentRoute) {
          utils.forEach(routerConfig[currentRoute], (item, lang) => {
            // Modify *a copy* of the router item.
            links.push(utils.merge(item, { title: lang.toUpperCase() }))
          })
        }
        this.links = links
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .language-switcher {
    ul {
      list-style: none;

      li {
        display: inline;

        a {
          margin: 0 .25rem;
          padding: .5rem;
        }
      }
    }
  }
</style>
