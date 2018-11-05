import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import title from '@/mixins/title';
import { NewsItem } from '@/store/news';

const news = namespace('news');

@Component({
  title: 'Home',
  asyncData: ({ store }) => store.dispatch('news/fetch'),
})
export default class HomePage extends Mixins(title) {
  @news.State('items')
  public items!: NewsItem[];

  @news.State('loading')
  public loading!: boolean;

  @news.State('error')
  public error!: Error | null;
}
