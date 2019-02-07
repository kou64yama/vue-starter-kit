import { CreateElement } from 'vue';
import { Component, Mixins } from 'vue-property-decorator';
import HtmlPage from '@/components/HtmlPage.vue';
import TitleMixin from '@/mixins/TitleMixin';
import about from './about.md';

@Component({
  title: about.title,
})
export default class AboutPage extends Mixins(TitleMixin) {
  public render(h: CreateElement) {
    return h(HtmlPage, { props: about });
  }
}
