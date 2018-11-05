import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ErrorPage extends Vue {
  @Prop({ type: Error, required: true })
  public error!: Error;

  public get isDev() {
    return __DEV__;
  }
}
