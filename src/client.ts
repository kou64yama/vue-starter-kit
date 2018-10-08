import createApp from './createApp';

const { vm, router } = createApp();

router.onReady(() => {
  vm.$mount('#app');
});
