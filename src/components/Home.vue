<template>
  <div class="node">
    <h1>{{ node.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      node: {
        title: 'Node title'
      }
    }
  }
}
</script>
