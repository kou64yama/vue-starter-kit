import Vue from 'vue';
import AppNavigation from '../AppNavigation';
import logoUrl2x from './logo-small@2x.png';

export default Vue.extend({
  components: { AppNavigation },
  computed: {
    logoUrl2x: () => logoUrl2x,
  },
});
