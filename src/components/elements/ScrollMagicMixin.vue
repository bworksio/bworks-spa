<script type="text/javascript">
  import { forEach } from '../../utils'

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
