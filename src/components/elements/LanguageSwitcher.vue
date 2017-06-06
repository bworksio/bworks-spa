<template>
  <nav class="language-switcher">
    <ul>
      <li v-for="link in links">
        <router-link :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script type="text/javascript">
  import { forEach, merge } from '../../utils'
  import config from '../../config/app.json'
  import routesConfig from '../../config/routes'

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
          forEach(routesConfig[currentRoute], (item, lang) => {
            if (config.activeLanguages.indexOf(lang) !== -1) {
              // Modify *a copy* of the router item.
              links.push(merge(item, { title: lang.toUpperCase() }))
            }
          })
        }
        this.links = links
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../assets/scss/mixins';

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
