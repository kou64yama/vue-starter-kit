import Vue from 'vue';
import { mapState } from 'vuex';
import title from '@/mixins/title';

export default Vue.extend<{}, {}, {}, {}>({
  mixins: [title],

  title: 'Home',

  computed: {
    ...(mapState('news', ['items', 'loading', 'error']) as any),
  },

  asyncData({ store }) {
    return store.dispatch('news/fetch');
  },
});
