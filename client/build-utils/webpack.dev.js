const webpack = require('webpack');
const commonPaths = require('./common-paths');

const port = process.env.PORT || 3000;

config = {
  mode: 'development',
  entry: ['react-hot-loader/patch', `${commonPaths.appEntry}/index.js`],
  output: {
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
};

module.exports = config;
