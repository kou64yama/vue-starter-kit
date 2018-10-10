/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import common, { isDebug, reStyle, reImage, BUILD_DIR } from './webpack.common';
import overrideRules from './lib/overrideRules';

// tslint:disable-next-line variable-name
const VueLoaderPlugin: {
  new (): webpack.Plugin;
} = require('vue-loader/lib/plugin');

const serverConfig = {
  ...common,

  name: 'server',
  target: 'node',

  entry: {
    server: ['./src/server.ts'],
  },

  output: {
    ...common.output,
    path: BUILD_DIR,
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    libraryTarget: 'commonjs2',
  },

  // Webpack mutates resolve object, so clone it to avoid issues
  // https://github.com/webpack/webpack/issues/4817
  resolve: {
    ...common.resolve,
  },

  module: {
    ...common.module,
    rules: overrideRules(common.module.rules, rule => {
      // Override paths to static assets
      if (
        rule.loader === 'file-loader' ||
        rule.loader === 'url-loader' ||
        rule.loader === 'svg-url-loader'
      ) {
        return {
          ...rule,
          options: {
            ...(rule.options as any),
            emitFile: false,
          },
        };
      }

      return rule;
    }),
  },

  externals: [
    './asset-manifest.json',
    nodeExternals({
      whitelist: [reStyle, reImage],
    }),
  ],

  plugins: [
    // https://vue-loader.vuejs.org/guide/#manual-configuration
    new VueLoaderPlugin(),

    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

export default serverConfig;
