export default {
  data: () => ({
    scrollMagicController: null,
    scrollMagicScenes: []
  }),

  methods: {
    addScrollMagicScene (scene) {
      if (!this.scrollMagicController) {
        const ScrollMagicController = require('scrollmagic').Controller
        this.scrollMagicController = new ScrollMagicController()
      }
      this.scrollMagicScenes.push(scene)
      return scene.addTo(this.scrollMagicController)
    }
  },

  beforeDestroy () {
    this.scrollMagicScenes.forEach((scene) => {
      scene.destroy(true)
    })
  }
}
