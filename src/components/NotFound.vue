<template>
  <div class="not-found">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'NotFound',
    data () {
      return {
        msg: 'Not found'
      }
    },
    created () {
      this.$store.commit('setInitialized', true)
    }
  }
</script>
