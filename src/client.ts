import 'whatwg-fetch';
import createApp from './createApp';
import createFetch from './createFetch';
import awaitAsyncData from './awaitAsyncData';
import { State } from './store';

interface GTag {
  (command: string, ...args: any[]): any;
}

declare const window: Window & {
  __INITIAL_STATE__: State;
};

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const { vm, router, store } = createApp({
  fetch: createFetch(fetch, {
    baseUrl: initialState.app.apiUrl,
  }),
});

store.replaceState(initialState);

router.onReady(() => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // we only care about non-previously-rendered components,
    // so we compare them until the two matched lists differ
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    // this is where we should trigger a loading indicator if there is one

    try {
      await awaitAsyncData(activated, { store, route: to });
      // stop loading indicator

      next();
    } catch (err) {
      next(err);
    }
  });

  if (window.gtag) {
    router.afterEach((to, _from) =>
      vm.$nextTick(() => {
        window.gtag!('config', store.state.app.googleTrackingId, {
          page_path: to.fullPath,
        });
      }),
    );
  }

  vm.$mount('#app');
});
