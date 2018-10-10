import Vue from 'vue';
import title from '@/mixins/title';

export default Vue.extend({
  mixins: [title],

  title() {
    return this.$props.title;
  },

  props: {
    title: { type: String, required: true },
  },
});
