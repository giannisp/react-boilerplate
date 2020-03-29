/**
 * @file Webpack configuration.
 */

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');
const appPath = `${rootPath}/src`;
const distPath = `${rootPath}/dist`;
const publicPath = `${rootPath}/public`;

/**
 * Return the base configuration.
 *
 * @param {Boolean} isProduction If in production mode.
 *
 * @return {Object} The base configuration.
 */
const getBaseConfig = (isProduction) => ({
  entry: {
    app: `${appPath}/index.js`,
  },
  output: {
    filename: '[name].[hash:8].js',
    path: distPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          configFile: `${rootPath}/.eslintrc`,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            comparisons: false,
            warnings: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            comments: false,
            ascii_only: true, // eslint-disable-line babel/camelcase
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
    },
  },
});

/**
 * Return the development configuration.
 *
 * @return {Object} The development configuration.
 */
const getDevelopmentConfig = () => ({
  devtool: 'inline-source-map',
  devServer: {
    contentBase: publicPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
});

/**
 * Return the configuration plugins.
 *
 * @param {String} mode The environment mode.
 * @param {Boolean} isProduction If in production mode.
 *
 * @return {Object[]} The configuration plugins.
 */
const getConfigPlugins = (mode, isProduction) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: `${publicPath}/index.html`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
    }),
  ];

  if (isProduction) {
    return [
      ...plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: publicPath, to: distPath, ignore: ['index.html'] },
      ]),
    ];
  }

  return plugins;
};

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === 'production';

  const baseConfig = getBaseConfig(isProduction);
  const devConfig = !isProduction ? getDevelopmentConfig() : {};

  return {
    ...baseConfig,
    ...devConfig,
    plugins: getConfigPlugins(mode, isProduction),
  };
};
