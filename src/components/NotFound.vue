<template>
  <div class="not-found">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import { store } from '../store'

  export default {
    name: 'NotFound',
    data () {
      return {
        msg: 'Not found'
      }
    },
    beforeRouteEnter (to, from, next) {
      store.state.initialized = true
      next()
    }
  }
</script>
