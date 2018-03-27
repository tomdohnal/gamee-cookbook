const webpack = require('webpack');

const commonPaths = require('./common-paths');

const port = process.env.PORT || 3000;

const config = {
  mode: 'production',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },
  output: {
    filename: 'static/bundle.[hash].js',
  },
  devtool: 'source-map',
};

module.exports = config;
