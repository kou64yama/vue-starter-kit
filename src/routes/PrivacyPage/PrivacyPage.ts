import { CreateElement } from 'vue';
import { Component, Mixins } from 'vue-property-decorator';
import HtmlPage from '@/components/HtmlPage';
import title from '@/mixins/title';
import privacy from './privacy.md';

@Component({
  title: privacy.title,
})
export default class PrivacyPage extends Mixins(title) {
  public render(h: CreateElement) {
    return h(HtmlPage, { props: privacy });
  }
}
