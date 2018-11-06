import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TitleMixin from '@/mixins/TitleMixin';
import { NewsItem } from '@/store/news';

const news = namespace('news');

@Component({
  title: 'Home',
  asyncData: ({ store }) => store.dispatch('news/fetch'),
})
export default class HomePage extends Mixins(TitleMixin) {
  @news.State('items')
  public items!: NewsItem[];

  @news.State('loading')
  public loading!: boolean;

  @news.State('error')
  public error!: Error | null;
}
