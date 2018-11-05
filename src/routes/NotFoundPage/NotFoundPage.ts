import { Component, Mixins, Prop } from 'vue-property-decorator';
import title from '@/mixins/title';

@Component({
  title() {
    return this.$props.title;
  },
})
export default class NotFoundPage extends Mixins(title) {
  @Prop({ type: String, required: true })
  public title!: string;
}
