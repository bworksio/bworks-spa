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
      browsers: [
        "> 0.5% in DE",
        "> 0.5% in CH",
        "last 2 versions",
        "Firefox ESR",
        "iOS >= 9",
        "Safari >= 9",
        "Android >= 4.4"
      ]
    })
  ]
}
