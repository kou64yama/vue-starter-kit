import { Component, Route } from 'vue-router/types/router';
import { Store } from 'vuex';

interface AsyncDataContext<S> {
  route: Route;
  store: Store<S>;
}

// https://ssr.vuejs.org/guide/data.html
export default async function awaitAsyncData<S>(
  components: Component[],
  context: AsyncDataContext<S>,
) {
  return Promise.all(
    components.map(async asyncComponent => {
      const resolved = await asyncComponent;
      const asyncData =
        ('asyncData' in resolved && resolved.asyncData) ||
        ('options' in resolved && resolved.options.asyncData);

      if (asyncData) {
        return asyncData(context);
      }
    }),
  );
}
