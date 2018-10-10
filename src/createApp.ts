import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import routes from './routes';
import modules, { State } from './store';
import createLogger from './store/plugins/logger';
import { Fetch } from './createFetch';
import App from './App.vue';

Vue.config.productionTip = __DEV__;
Vue.use(Router);
Vue.use(Vuex);

interface Options {
  fetch: Fetch;
}

export default function createApp(options: Options) {
  const router = new Router({
    routes,
    mode: 'history',
  });

  const store = new Vuex.Store<State>({
    modules,
    getters: {
      fetch: () => options.fetch,
    },
    plugins: [...(__DEV__ ? [createLogger({ collapsed: false })] : [])],
    strict: __DEV__,
  });

  const vm = new Vue({
    router,
    store,
    render: h => h(App, { attrs: { id: 'app' } }),
  });

  sync(store, router);
  return { vm, router, store };
}
