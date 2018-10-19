/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in https://github.com/kriasoft/react-starter-kit.
 */

export function format(time: Date) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

type TaskFunction<O, T> = (options?: O) => Promise<T>;

interface TaskModule<O, T> extends TaskFunction<O, T> {
  default?: TaskFunction<O, T>;
}

function run<O, T>(fn: TaskModule<O, T>, options?: O): Promise<T> {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.info(
    `[${format(start)}] Starting '${task.name}${
      options ? ` (${options})` : ''
    }'...`,
  );
  return task(options).then(resolution => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.info(
      `[${format(end)}] Finished '${task.name}${
        options ? ` (${options})` : ''
      }' after ${time} ms`,
    );
    return resolution;
  });
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = require(`./${process.argv[2]}.ts`).default;

  run(module).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}

export default run;
