const utils = require('./utils.js')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: !isProd,
    extract: isProd
  }),
  extractCSS: isProd,
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
