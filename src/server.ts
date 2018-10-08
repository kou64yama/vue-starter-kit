import express from 'express';
import { createRenderer } from 'vue-server-renderer';
import createApp from './createApp';
import assets from './asset-manifest.json';
import template from './template.hbs';
import config from './config';

export interface Application extends express.Application {
  hot: typeof module.hot;
}

const app: Application = Object.assign(express(), {
  hot: module.hot,
});

const renderer = createRenderer();

app.get('*', async (req, res, next) => {
  const { vm, router } = createApp();
  router.push(req.originalUrl);

  try {
    await new Promise(router.onReady.bind(router));
    const html = await renderer.renderToString(vm);
    res.send(template({ html, assets, title: '' }));
  } catch (err) {
    next(err);
  }
});

if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

export default app;
