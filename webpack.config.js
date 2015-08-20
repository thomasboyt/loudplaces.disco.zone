/*
 * Custom webpack config that gets merged into default nite-flights config
 */

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

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },

  postcss: function () {
    return [postcssImport, autoprefixer, precss];
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
