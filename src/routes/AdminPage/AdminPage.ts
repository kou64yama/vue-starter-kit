import Vue from 'vue';
import title from '@/mixins/title';

const isAdmin = true;

export default Vue.extend({
  mixins: [title],
  title() {
    return this.$props.title;
  },
  props: {
    title: { type: String, required: true },
  },
  beforeRouteEnter(_to, _from, next) {
    if (isAdmin) {
      return next({ name: 'login' });
    }
    next();
  },
});
