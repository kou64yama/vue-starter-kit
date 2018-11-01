/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import path from 'path';
import webpack from 'webpack';
import pkg from '../package.json';
import tsConfig from '../tsconfig.json';

export const ROOT_DIR = path.resolve(__dirname, '..');
export const resolvePath = (...args: string[]) =>
  path.resolve(ROOT_DIR, ...args);
export const SRC_DIR = resolvePath('src');
export const BUILD_DIR = resolvePath('build');

export const isDebug = !process.argv.includes('--release');
export const isVerbose = process.argv.includes('--verbose');
export const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse');

export const reScript = /\.(js|jsx|mjs|ts|tsx)$/;
export const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
export const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const staticAssetName = isDebug
  ? '[path][name].[ext]?[hash:8]'
  : '[hash:8].[ext]';

// CSS Nano options http://cssnano.co/
const minimizeCssOptions = {
  discardComments: { removeAll: true },
};

//
// Common configuration chunk to be used for both
// client-side (client.ts) and main-side (main.ts) bundles
// -----------------------------------------------------------------------------

const config = {
  context: ROOT_DIR,

  mode: isDebug ? 'development' : 'production',

  output: {
    publicPath: '/assets/',
    pathinfo: isVerbose,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug
      ? '[name].chunk.js'
      : '[name].[chunkhash:8].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (
      info: webpack.DevtoolModuleFilenameTemplateInfo,
    ) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  resolve: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ['node_modules', 'src'],

    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.node'],

    alias: {
      '@': SRC_DIR,
    },
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Rules for Vue single-file components
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      // Rules for JS / JSX
      {
        test: /\.jsx?$/,
        include: [SRC_DIR, resolvePath('tools')],
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: pkg.browserslist,
                },
                forceAllTransforms: !isDebug, // for UglifyJS
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
          ],
          plugins: ['@babel/plugin-syntax-dynamic-import'],
        },
      },

      // Rules for TS / TSX
      {
        test: /\.tsx?$/,
        include: [SRC_DIR, resolvePath('tools')],
        loader: 'ts-loader',
        options: {
          transpileOnly: isDebug,
          appendTsSuffixTo: [/\.vue$/],
          compilerOptions: {
            ...tsConfig.compilerOptions,
            target: 'es2015',
            module: 'esnext',
            sourceMap: true,
            inlineSourceMap: false,
          },
        },
      },

      // Rules for Style Sheets
      {
        test: reStyle,
        rules: [
          {
            loader: 'vue-style-loader',
          },

          {
            oneOf: [
              // this matches `<style module>`
              {
                resourceQuery: /module/,
                loader: 'css-loader',
                options: {
                  // CSS Loader https://github.com/webpack/css-loader
                  importLoaders: 1,
                  sourceMap: isDebug,
                  // CSS Modules https://github.com/css-modules/css-modules
                  modules: true,
                  localIdentName: isDebug
                    ? '[name]-[local]-[hash:base64:5]'
                    : '[hash:base64:5]',
                  // CSS Nano http://cssnano.co/              // CSS Nano http://cssnano.co/
                  minimize: isDebug ? false : minimizeCssOptions,
                },
              },
              // this matches plain `<style>` or `<style scoped>`
              {
                loader: 'css-loader',
                options: {
                  // CSS Loader https://github.com/webpack/css-loader
                  importLoaders: 1,
                  sourceMap: isDebug,
                  // CSS Nano http://cssnano.co/              // CSS Nano http://cssnano.co/
                  minimize: isDebug ? false : minimizeCssOptions,
                },
              },
            ],
          },

          // Apply PostCSS plugins including autoprefixer
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js',
              },
            },
          },
        ],
      },

      // Rules for images
      {
        test: reImage,
        oneOf: [
          // Inline lightweight images into CSS
          {
            issuer: reStyle,
            oneOf: [
              // Inline lightweight SVGs as UTF-8 encoded DataUrl string
              {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },

              // Inline lightweight images as Base64 encoded DataUrl string
              {
                loader: 'url-loader',
                options: {
                  name: staticAssetName,
                  limit: 4096, // 4kb
                },
              },
            ],
          },

          // Or return public URL to image resource
          {
            loader: 'file-loader',
            options: {
              name: staticAssetName,
            },
          },
        ],
      },

      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },

      // Convert plain text into JS module
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },

      // Convert Markdown into HTML
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './lib/markdown-loader.js'),
      },

      // Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [
          reScript,
          reStyle,
          reImage,
          /\.vue$/,
          /\.json$/,
          /\.txt$/,
          /\.md$/,
          /\.hbs$/,
        ],
        loader: 'file-loader',
        options: {
          name: staticAssetName,
        },
      },

      // Exclude dev modules from production build
      ...(isDebug
        ? []
        : [
            {
              test: resolvePath(
                'node_modules/vue-hot-reload-api/dist/index.js',
              ),
              loader: 'null-loader',
            },
          ]),
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  // Specify what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose,
  },

  // Choose a developer tool to enhance debugging
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: isDebug ? 'inline-source-map' : 'source-map',
};

export default config;
