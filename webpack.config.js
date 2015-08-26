/*
 * Custom webpack config that gets merged into default nite-flights config
 */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import autoprefixer from 'autoprefixer';
import precss from 'precss';
import postcssImport from 'postcss-import';

export default {
  entry: {
    vendor: [
      'moment',
      'query-string',
      'r-dom',
      'remarkable',
      'remarkable-jsx',
      'timeout-transition-group'
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },

  postcss: function () {
    const watchCfg = {
      onImport: function(files) {
        files.forEach(this.addDependency);
      }.bind(this)
    };

    return [
      postcssImport(watchCfg),
      autoprefixer,
      precss
    ];
  }
};
