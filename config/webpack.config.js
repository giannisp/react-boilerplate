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

const config = {
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
  plugins: [
    new HtmlWebpackPlugin({
      template: `${publicPath}/index.html`,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

const applyDevelopmentConfig = () => {
  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: publicPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  };
};

const applyProductionConfig = () => {
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(
    new CopyWebpackPlugin([
      { from: publicPath, to: distPath, ignore: ['index.html'] },
    ]),
  );

  config.optimization = {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true, // eslint-disable-line babel/camelcase
          },
        },
      }),
    ],
  };
};

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  config.optimization.minimize = isProduction;

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(argv.mode),
      },
    }),
  );

  if (isDevelopment) {
    applyDevelopmentConfig();
  }

  if (isProduction) {
    applyProductionConfig();
  }

  return config;
};
