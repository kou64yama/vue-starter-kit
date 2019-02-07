import { CreateElement } from 'vue';
import { Component, Mixins } from 'vue-property-decorator';
import HtmlPage from '@/components/HtmlPage.vue';
import TitleMixin from '@/mixins/TitleMixin';
import privacy from './privacy.md';

@Component({
  title: privacy.title,
})
export default class PrivacyPage extends Mixins(TitleMixin) {
  public render(h: CreateElement) {
    return h(HtmlPage, { props: privacy });
  }
}
