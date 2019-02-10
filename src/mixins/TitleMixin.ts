// https://ssr.vuejs.org/guide/head.html

import Vue from 'vue';
import { Component } from 'vue-property-decorator';

function getTitle(vm: Vue) {
  const title =
    typeof vm.$options.title === 'function'
      ? vm.$options.title.call(vm)
      : vm.$options.title;
  return `${title || 'Untitled Page '} - vuestarterkit.herokuapp.com`;
}

@Component
class ServerTitleMixin extends Vue {
  public created() {
    this.$ssrContext.title = getTitle(this);
  }
}

@Component
class ClientTitleMixin extends Vue {
  public mounted() {
    document.title = getTitle(this);
  }
}

export default (process.env.BROWSER ? ClientTitleMixin : ServerTitleMixin);
