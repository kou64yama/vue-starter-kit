import Vue, { ComponentOptions } from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';

interface AsyncDataContext<S> {
  route: Route;
  store: Store<S>;
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    asyncData?: <S = {}>(context: AsyncDataContext<S>) => any;
    options: ComponentOptions<Vue>;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    title?: string | (() => string);
    asyncData?: <S = {}>(context: AsyncDataContext<S>) => any;
  }
}
