import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '../AppHeader';
import AppFeedback from '../AppFeedback';
import AppFooter from '../AppFooter';

@Component({
  components: {
    AppHeader,
    AppFeedback,
    AppFooter,
  },
})
export default class RootLayout extends Vue {}
