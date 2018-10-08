/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

import path from 'path';
import cp from 'child_process';
import serverConfig from './webpack.server';
import { format } from './run';

export interface ServerProcess extends cp.ChildProcess {
  host: string;
}

// Should match the text string used in `src/server.ts/server.listen(...)`
const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;

let server: ServerProcess | null = null;
const serverPath = path.join(
  serverConfig.output.path,
  serverConfig.output.filename.replace('[name]', 'server'),
);

function runServer(): Promise<ServerProcess> {
  return new Promise<ServerProcess>(resolve => {
    if (server) {
      server.kill('SIGTERM');
      return server.once('exit', () => resolve(runServer()));
    }

    const p = cp.spawn('node', [serverPath], {
      env: { NODE_ENV: 'development', ...process.env },
    });

    function onStdOut(data: Buffer) {
      const now = new Date();
      process.stdout.write(`[${format(now)}] `);
      process.stdout.write(data);

      const match = data.toString('utf8').match(RUNNING_REGEXP);
      if (match) {
        resolve(
          (server = Object.assign(p, {
            host: match[1],
          })),
        );
        p.once('exit', () => (server = null));
        p.stdout.removeListener('data', onStdOut);
        p.stdout.on('data', data => process.stderr.write(data));
      }
    }

    p.stdout.on('data', onStdOut);
    p.stderr.on('data', data => process.stderr.write(data));
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;
