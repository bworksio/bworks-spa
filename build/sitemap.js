/**
 * Generate sitemap.xml
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var sm = require('sitemap')

/**
 * Module exports.
 * @public
 */

/**
 * Build sitemap from configuration.
 * @param req
 * @param res
 */
module.exports = (req, res) => {
  var routesConfig = require('../src/config/routes.js')
  var appConfig = require('../src/config/app.json')
  var urls = []
  var lang = 'en'

  Object.keys(routesConfig).forEach(name => {
    var languages = routesConfig[name]

    if (!('show' in languages) || !!languages.show) {
      var links = []

      // First pass: collect language variations
      Object.keys(languages).forEach(lang => {
        var item = languages[lang]
        if (appConfig.activeLanguages.indexOf(lang) !== -1) {
          // Add language variation
          links.push({
            lang: lang,
            url: appConfig.baseUrl + item.path.substr(1)
          })
        }
      })

      // Second pass: add all urls together with language variations to sitemap
      Object.keys(languages).forEach(lang => {
        var item = languages[lang]
        if (appConfig.activeLanguages.indexOf(lang) !== -1) {
          urls.push({
            url: appConfig.baseUrl + item.path.substr(1),
            //changefreq: 'weekly',
            //priority: 0.5,
            links: links
          })
        }
      })
    }
  })

  // Synchonous getNodes() to add dynamic routes
  var request = require('request')
  var uri = appConfig.api.baseUrl + lang + '/spa_api/contents'

  request({ uri: uri }, function (rErr, rRes, body) {
    if (rErr) {
      return res.status(500).end();
    }
    var nodes = JSON.parse(body)

    // getNodesByType() to add articles
    Object.values(nodes).forEach(node => {
      if (node.type[0].target_id === 'bworks_article') {
        if (node.hasOwnProperty('path') && node.path.length) {
          // Add to sitemap (without language variations)
          urls.push({
            url: appConfig.baseUrl + node.path[0].alias.substr(1)
          })
        }
      }
    })

    // Generate and send sitemap
    var sitemap = sm.createSitemap({
      hostname: appConfig.baseUrl.substr(0, -1),
      cacheTime: 10 * 60 * 1000,  // 10 min cache purge period
      urls: urls
    });

    sitemap.toXML((err, xml) => {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  })
}
