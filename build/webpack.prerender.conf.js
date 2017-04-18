var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = {
  plugins: []
}

// Prerender pages
var PrerenderSpaPlugin = require('prerender-spa-plugin')

// Build routes from configuration.
var apputils = require('../src/utils.js')
var routesConfig = require('../src/config/routes.js')
var appConfig = require('../src/config/app.json')
var prerenderRoutes = []
apputils.forEach(routesConfig, (languages, name) => {
  apputils.forEach(languages, (item, lang) => {
    if (appConfig.activeLanguages.indexOf(lang) !== -1) {
      prerenderRoutes.push(item.path)
    }
  })
})

webpackConfig.plugins.push(
  new PrerenderSpaPlugin(
    // Absolute path to compiled SPA
    path.join(__dirname, '../dist'),
    prerenderRoutes,
    {
      captureAfterDocumentEvent: 'prerender',
      //ignoreJSErrors: true,
      //maxAttempts: 2,
      phantomPageSettings: {
        localToRemoteUrlAccessEnabled: true,
        webSecurityEnabled: false,
        userAgent: 'PhantomJS'
      }
    }
  )
)

module.exports = webpackConfig
