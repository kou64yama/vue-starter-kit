import Vue from 'vue';
import HtmlPage from '@/components/HtmlPage';
import title from '@/mixins/title';
import privacy from './privacy.md';

export default Vue.extend({
  mixins: [title],
  title: privacy.title,
  render: h => h(HtmlPage, { props: privacy }),
});
