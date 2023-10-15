const serverless_webpack = require('serverless-webpack')
const webpack_node_externals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  context: __dirname,
  mode: serverless_webpack.lib.webpack.isLocal ? 'development' : 'production',
  entry: serverless_webpack.lib.entries,
  devtool: serverless_webpack.lib.webpack.isLocal ? 'inline-cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [webpack_node_externals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [[path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, '.serverless'), path.resolve(__dirname, '.webpack')]],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
}
