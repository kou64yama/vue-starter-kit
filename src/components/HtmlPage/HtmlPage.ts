import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class HtmlPage extends Vue {
  @Prop({ type: String, required: false })
  public title!: string;

  @Prop({ type: String, required: false })
  public html!: string;
}
