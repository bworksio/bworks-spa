'use strict';

var sm = require('sitemap')
var request = require('request')
var utils = require('./utils')
var appConfig = require('../src/config/app.json')
var routesConfig = require('../src/config/routes.js')

var cleanUrl = function (url) {
  return url.replace(/:\w+\??/, '').replace(/\/$/, '')
}

module.exports = (req, res) => {
  var urls = []

  Object.keys(routesConfig).forEach(name => {
    var languages = routesConfig[name]

    if (!('show' in languages) || !!languages.show) {

      // First pass: collect language variations
      var links = []
      Object.keys(languages).forEach(lang => {
        var item = languages[lang]
        if (appConfig.activeLanguages.indexOf(lang) !== -1) {
          // Add language variation
          links.push({
            lang: lang,
            url: cleanUrl(appConfig.baseUrl + item.path.substr(1))
          })
        }
      })

      // Second pass: add all urls together with language variations to sitemap
      Object.keys(languages).forEach(lang => {
        var item = languages[lang]
        if (appConfig.activeLanguages.indexOf(lang) !== -1) {
          urls.push({
            url: cleanUrl(appConfig.baseUrl + item.path.substr(1)),
            links: links
          })
        }
      })
    }
  })

  // Synchonous getNodes() to add custom blog article routes (only english)
  var uri = appConfig.api.baseUrl + 'en/spa_api/contents?_format=json'

  request({ uri: uri }, function (rErr, rRes, body) {
    if (rErr) {
      return res.status(500).end();
    }
    var nodes = JSON.parse(body)

    // getNodesByType() to add articles
    Object.values(nodes).forEach(node => {
      if (node.type[0].target_id === 'bworks_article') {
        if (node.hasOwnProperty('path') && node.path.length) {
          urls.push({
            url: appConfig.baseUrl + node.path[0].alias.substr(1)
          })
        }
      }
    })

    // Synchonous getData() to add custom routes
    var uri = appConfig.api.baseUrl + 'spa_api/contents_map?_format=json'

    request({uri: uri}, function (rErr, rRes, body) {
      if (rErr) {
        return res.status(500).end();
      }
      var queue = JSON.parse(body)

      Object.keys(queue).forEach(name => {
        // Skip if this is a known route.
        if (routesConfig[name]) return;

        // First pass: collect language variations
        var links = []
        appConfig.activeLanguages.forEach(lang => {
          if (queue[name].path[lang]) {
            links.push({
              lang: lang,
              url: appConfig.baseUrl + queue[name].path[lang].substr(1)
            })
          }
        })

        // Second pass: add urls together with language variations to sitemap
        links.forEach(link => {
          urls.push({
            url: link.url,
            links: links
          })
        })
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
  })
}
