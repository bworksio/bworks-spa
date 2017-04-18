// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
require('es6-promise/auto')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prerender.conf')

var spinner = ora('prerendering...')
spinner.start()

// var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// rm('-r', assetsPath)

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
