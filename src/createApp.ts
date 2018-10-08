import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = __DEV__;
Vue.use(Router);

export default function createApp() {
  const router = new Router();

  const vm = new Vue({
    router,
    render: h => h(App),
  });

  return { vm, router };
}
