import Vue from 'vue';
import HtmlPage from '@/components/HtmlPage';
import title from '@/mixins/title';
import about from './about.md';

export default Vue.extend({
  mixins: [title],
  title: about.title,
  render: h => h(HtmlPage, { props: about }),
});
