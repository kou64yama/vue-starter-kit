import { Component, Mixins, Prop } from 'vue-property-decorator';
import TitleMixin from '@/mixins/TitleMixin';

@Component({
  title() {
    return this.$props.title;
  },
})
export default class ContactPage extends Mixins(TitleMixin) {
  @Prop({ type: String, required: true })
  public title!: string;
}
