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
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import PrettyError from 'pretty-error';
import createApp from './createApp';
import ErrorPage from './routes/ErrorPage.vue';
import assets from './asset-manifest.json';
import template from './template.hbs';
import createFetch from './createFetch';
import awaitAsyncData from './awaitAsyncData';
import passport from './passport';
import models from './data/models';
import schema from './data/schema';
import config from './config';

export interface Application extends express.Application {
  hot: typeof module.hot;
}

interface RendererContext {
  renderResourceHints(): string;
  renderState(): string;
  renderScripts(): string;
  renderStyles(): string;
  state?: any;
  title?: string;
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  process.exit(1);
});

const app: Application = Object.assign(express(), {
  hot: module.hot,
});

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
// Error handler for express-jwt
app.use(((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
}) as express.ErrorRequestHandler);

app.use(passport.initialize());

app.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);
app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
const renderer = createRenderer();

app.get('*', async (req, res, next) => {
  const { vm, router, store } = createApp({
    fetch: createFetch(fetch, {
      schema,
      graphql,
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie as string,
    }),
  });
  router.push(req.originalUrl);
  store.replaceState({
    ...store.state,
    app: {
      apiUrl: config.api.clientUrl,
      googleTrackingId: config.analytics.googleTrackingId,
    },
    me: req.user && {
      id: req.user.id,
      email: req.user.email,
    },
  });

  try {
    await store.dispatch('runtime/setVariable', {
      name: 'initialNow',
      value: Date.now(),
    });
    await new Promise(router.onReady.bind(router));
    await awaitAsyncData(router.getMatchedComponents(), {
      store,
      route: router.currentRoute,
    });
    const context = { state: store.state } as RendererContext;
    const html = await renderer.renderToString(vm, context);
    res.send(
      template({
        html,
        title: context.title || '',
        description: '',
        scripts: [assets['vendors.js'], assets['client.js']],
        styles: context.renderStyles(),
        state: context.renderState(),
        googleTrackingId: config.analytics.googleTrackingId,
      }),
    );
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((async (err, _req, res, next) => {
  console.error(pe.render(err));

  try {
    const context = {} as RendererContext;
    const vm = new Vue({
      render: h => h(ErrorPage, { props: { error: err } }),
    });
    const html = await renderer.renderToString(vm, context);
    res.status(err.status || 500);
    res.send(
      template({
        html,
        title: 'Internal Server Error',
        description: err.message,
        scripts: [],
        styles: context.renderStyles(),
        googleTrackingId: config.analytics.googleTrackingId,
      }),
    );
  } catch (err) {
    next(err);
  }
}) as express.ErrorRequestHandler);

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

export default app;
