import 'whatwg-fetch';
import createApp from './createApp';
import createFetch from './createFetch';
import { State } from './store';

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
