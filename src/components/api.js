const nodes = {
  0: {
    nid: 1,
    path: 'home',
    title: 'sunt aut facere',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
  },
  1: {
    nid: 2,
    path: 'test',
    title: 'qui est esse',
    body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
  }
}

// Create { path: index } mapping of nodes.
const map = Object.keys(nodes).reduce((acc, key, index) => {
  acc[nodes[key].path] = index
  return acc
}, {})

export function getNode (path, cb) {
  // Fake an API request
  setTimeout(() => {
    if (path in map) {
      cb(null, nodes[map[path]])
    } else {
      cb(new Error('Page not found.'))
    }
  }, 250)
}
