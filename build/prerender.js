'use strict'
// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
require('es6-promise/auto')

var fs = require('fs')
var path = require('path')
var config = require('../config')
var ora = require('ora')
var logSymbols = require('log-symbols');
var webpack = require('webpack')
var utils = require('../src/utils')
var lang = 'en'
var PrerenderSpaPlugin = require('prerender-spa-plugin')
var sm = require('sitemap')

var spinner = ora('fetching remote data...')
spinner.start()

// Remove any existing subdirectories first
function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}
utils.forEach(getDirectories(config.build.assetsRoot), function (dir) {
  if (dir !== 'static') {
    rm('-r', path.join(config.build.assetsRoot, dir))
  }
})

var webpackConfig = {
  plugins: []
}

// Build routes from configuration.
var routesConfig = require('../src/config/routes.js')
var appConfig = require('../src/config/app.json')
var prerenderRoutes = []
var sitemapUrls = []

utils.forEach(routesConfig, (languages, name) => {
  if (!('show' in languages) || !!languages.show) {
    var sitemapLinks = []

    utils.forEach(languages, (item, lang) => {
      if (appConfig.activeLanguages.indexOf(lang) !== -1) {
        prerenderRoutes.push(item.path)

        // Add language variation to sitemap.
        sitemapLinks.push({
          lang: lang,
          url: appConfig.baseUrl + item.path.substr(1)
        })
      }
    })

    // Second pass: add each language url together with language variations to sitemap.
    utils.forEach(languages, (item, lang) => {
      if (appConfig.activeLanguages.indexOf(lang) !== -1) {
        sitemapUrls.push({
          url: appConfig.baseUrl + item.path.substr(1),
          //changefreq: 'weekly',
          //priority: 0.5,
          links: sitemapLinks
        })
      }
    })
  }
})

// Synchonous getNodes() to add dynamic routes
var request = require('request')
var uri = 'http:' + appConfig.api.baseUrl + lang + '/spa_api/contents?t='
  + Math.floor((new Date()).getTime() / 10000).toString()

request({ uri: uri }, function (error, response, body) {
  if (error) {
    return console.error(error)
  }
  var nodes = JSON.parse(body)

  // getNodesByType() to add articles
  utils.forEach(nodes, node => {
    if (node.type[0].target_id === 'bworks_article') {
      if (node.hasOwnProperty('path') && node.path.length) {
        prerenderRoutes.push(node.path[0].alias)

        // Add to sitemap (no language variations).
        sitemapUrls.push({
          url: appConfig.baseUrl + node.path[0].alias.substr(1)
        })
      }
    }
  })

  // Generate sitemap.
  var sitemap = sm.createSitemap({
    hostname: appConfig.baseUrl.substr(0, -1),
    cacheTime: 600000,  //600 sec (10 min) cache purge period
    urls: sitemapUrls
  });
  fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemap.toString());

  spinner.stopAndPersist(logSymbols.success)
  console.log('routes to prerender:\n', prerenderRoutes)

  webpackConfig.plugins.push(
    new PrerenderSpaPlugin(
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

  spinner = ora('prerendering...')
  spinner.start()

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
  })

})
