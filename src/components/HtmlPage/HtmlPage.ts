import Vue from 'vue';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    html: { type: String, required: false },
  },
});
