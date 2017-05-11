import Axios from 'axios'

let preloadImages = []

const transformResponse = Axios.defaults.transformResponse
// Add transform step to extract images and videos from JSON response.
transformResponse.unshift(function (data, headers) {
  if (headers['content-type'].substr(-4) === 'json') {
    let match
    const re = /(?:https?:)?\\\/\\\/[^"]+?\.(?:jpe?g|png)/g
    while ((match = re.exec(data)) !== null) {
      preloadImages.push(match[0])
    }
  }
  return data
})

export { transformResponse, preloadImages }
