// https://ssr.vuejs.org/guide/head.html

import Vue from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';

type Mixin = ThisTypedComponentOptionsWithRecordProps<Vue, {}, {}, {}, {}>;

function getTitle(vm: Vue) {
  const title =
    typeof vm.$options.title === 'function'
      ? vm.$options.title.call(vm)
      : vm.$options.title;
  return `${title || 'Untitled Page '} - www.vuestarterkit.com`;
}

const serverTitleMixin: Mixin = {
  created() {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = title;
    }
  },
};

const clientTitleMixin: Mixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};

export default (process.env.BROWSER ? clientTitleMixin : serverTitleMixin);
