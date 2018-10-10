import Vue from 'vue';

export default Vue.extend({
  props: {
    error: { type: Error, required: true },
  },
  computed: {
    isDev: () => __DEV__,
  },
});
