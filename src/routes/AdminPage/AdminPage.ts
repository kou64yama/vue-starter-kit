import { Component, Mixins, Prop } from 'vue-property-decorator';
import title from '@/mixins/title';

const isAdmin = true;

@Component({
  title() {
    return this.$props.title;
  },
  beforeRouteEnter(_to, _from, next) {
    if (isAdmin) next({ name: 'login' });
    else next();
  },
})
export default class AdminPage extends Mixins(title) {
  @Prop({ type: String, required: true })
  public title!: string;
}
