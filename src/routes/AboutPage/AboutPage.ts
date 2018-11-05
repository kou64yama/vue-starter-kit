import { CreateElement } from 'vue';
import { Component, Mixins } from 'vue-property-decorator';
import HtmlPage from '@/components/HtmlPage';
import title from '@/mixins/title';
import about from './about.md';

@Component({
  title: about.title,
})
export default class AboutPage extends Mixins(title) {
  public render(h: CreateElement) {
    return h(HtmlPage, { props: about });
  }
}
