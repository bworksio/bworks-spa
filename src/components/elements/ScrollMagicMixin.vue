<script type="text/javascript">
  const forEach = require('axios/lib/utils.js').forEach

  let scrollMagicScenes = []

  export default {
    methods: {
      addScrollMagicScene (scene) {
        scrollMagicScenes.push(scene)
      }
    },
    beforeDestroy () {
      // Destroy ScrollMagic scenes.
      forEach(scrollMagicScenes, (scene) => {
        scene.destroy(true)
      })
    }
  }
</script>
