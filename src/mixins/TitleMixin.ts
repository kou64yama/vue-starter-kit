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
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = title;
    }
  }
}

@Component
class ClientTitleMixin extends Vue {
  public mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  }
}

export default (process.env.BROWSER ? ClientTitleMixin : ServerTitleMixin);
