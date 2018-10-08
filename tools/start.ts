/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import path from 'path';
import express from 'express';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import commonConfig from './webpack.common';
import clientConfig from './webpack.client';
import serverConfig from './webpack.server';
import run, { format } from './run';
import clean from './clean';
import { Application } from '../src/server';

const isDebug = !process.argv.includes('--release');

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions: webpack.WatchOptions = {
  // Watching may not work with NFS and machines in VirtualBox
  // Uncomment next line if it is your case (use true or interval in milliseconds)
  // poll: true,
  // Decrease CPU or memory usage in some file systems
  // ignored: /node_modules/,
};

function checkForUpdate(fromUpdate = false) {
  const app: Application = require('../build/server').default;
  const hmrPrefix = '[\x1b[35mHMR\x1b[0m]';
  if (!app.hot) {
    throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
  }
  const hot = app.hot;
  if (hot.status() !== 'idle') {
    return Promise.resolve();
  }
  const check: (
    autoApply: boolean,
  ) => Promise<__WebpackModuleApi.ModuleId[]> = hot.check as any;
  return check(true)
    .then(updatedModules => {
      if (!updatedModules) {
        if (fromUpdate) {
          console.info(`${hmrPrefix} Update applied.`);
        }
        return;
      }
      if (updatedModules.length === 0) {
        console.info(`${hmrPrefix} Nothing hot updated.`);
      } else {
        console.info(`${hmrPrefix} Updated modules:`);
        updatedModules.forEach(moduleId =>
          console.info(`${hmrPrefix} - ${moduleId}`),
        );
        checkForUpdate(true);
      }
    })
    .catch(error => {
      if (['abort', 'fail'].includes(hot.status())) {
        console.warn(`${hmrPrefix} Cannot apply update.`);
        delete require.cache[require.resolve('../build/server')];
        console.warn(`${hmrPrefix} App has been reloaded.`);
      } else {
        console.warn(
          `${hmrPrefix} Update failed: ${error.stack || error.message}`,
        );
      }
    });
}

async function start() {
  // Configure client-side hot module replacement
  clientConfig.entry.client = [
    'webpack-hot-middleware/client',
    ...clientConfig.entry.client,
  ];
  clientConfig.output.filename = clientConfig.output.filename.replace(
    'chunkhash',
    'hash',
  );
  clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
    'chunkhash',
    'hash',
  );
  clientConfig.module.rules = clientConfig.module.rules.filter(
    x => x.loader !== 'null-loader',
  );
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Configure server-side hot module replacement
  Object.assign(serverConfig.output, {
    hotUpdateMainFilename: 'updates/[hash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js',
  });
  serverConfig.module.rules = serverConfig.module.rules.filter(
    x => x.loader !== 'null-loader',
  );
  serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  await run(clean);

  const multiCompiler = webpack([
    clientConfig,
    serverConfig,
  ] as webpack.Configuration[]);
  const [clientPromise, serverPromise] = multiCompiler.compilers.map(
    compiler =>
      new Promise<webpack.Stats>((resolve, reject) => {
        const name = compiler.name;
        let timeStart = new Date();
        compiler.hooks.compile.tap(name, () => {
          timeStart = new Date();
          console.info(`[${format(timeStart)}] Compiling '${name}'...`);
        });

        compiler.hooks.done.tap(name, stats => {
          console.info(stats.toString(commonConfig.stats));
          const timeEnd = new Date();
          const time = timeEnd.getTime() - timeStart.getTime();
          if (stats.hasErrors()) {
            console.info(
              `[${format(
                timeEnd,
              )}] Failed to compile '${name}' after ${time} ms`,
            );
            reject(new Error('Compilation failed!'));
          } else {
            console.info(
              `[${format(
                timeEnd,
              )}] Finished '${name}' compilation after ${time} ms`,
            );
            resolve(stats);
          }
        });
      }),
  );

  const [clientCompiler, serverCompiler] = multiCompiler.compilers;
  const bs = browserSync.create();
  const server = express();
  server.use(express.static(path.resolve(__dirname, '../public')));

  // https://github.com/webpack/webpack-dev-middleware
  server.use(
    webpackDevMiddleware(clientCompiler, {
      watchOptions,
      publicPath: clientConfig.output.publicPath,
      logLevel: 'silent',
    }),
  );

  // https://github.com/glenjamin/webpack-hot-middleware
  server.use(webpackHotMiddleware(clientCompiler, { log: false }));

  server.use(async (req, res) => {
    await clientPromise;
    await serverPromise;
    const app = require('../build/server').default;
    app.handle(req, res);
  });

  let clientResolved = false;
  clientPromise.then(() => (clientResolved = true));
  serverCompiler.watch(watchOptions, (error, stats) => {
    if (clientResolved && !error && !stats.hasErrors()) {
      checkForUpdate();
    }
  });

  const timeStart = new Date();
  console.info(`[${format(timeStart)}] Launching server...`);

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) =>
    bs.init(
      {
        // https://www.browsersync.io/docs/options
        server: 'src/server.js',
        middleware: [server],
        open: !process.argv.includes('--silent'),
        ...(isDebug ? {} : { notify: false, ui: false }),
        ghostMode: false,
      },
      (error, bs) => (error ? reject(error) : resolve(bs)),
    ),
  );

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
}

export default start;
