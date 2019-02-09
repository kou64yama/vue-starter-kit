import { Commit } from 'vuex';
import { Getters as RootGetters } from '.';

export const FETCH = 'FETCH';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export interface NewsItem {
  title: string;
  link: string;
  content: string;
}

export interface State {
  items: NewsItem[];
  loading: boolean;
  error: any;
  lastFetchedAt: number;
}

export const initialState: () => State = () => ({
  items: [],
  loading: false,
  error: null,
  lastFetchedAt: Number.MIN_SAFE_INTEGER,
});

export const mutations = {
  [FETCH](state: State) {
    state.loading = true;
  },
  [FETCH_SUCCESS](state: State, items: NewsItem[]) {
    state.items = items;
    state.loading = false;
    state.error = null;
    state.lastFetchedAt = Date.now();
  },
  [FETCH_ERROR](state: State, error: any) {
    state.loading = false;
    state.error = error;
  },
};

export const actions = {
  async fetch({
    state,
    commit,
    rootGetters,
  }: {
    state: State;
    commit: Commit;
    rootGetters: RootGetters;
  }) {
    if (Date.now() - state.lastFetchedAt <= 1000 * 60 * 10 /* 10 mins */) {
      return;
    }

    try {
      commit(FETCH);
      const resp = await rootGetters.fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '{news{title,link,content}}',
        }),
      });
      const { data } = await resp.json();
      if (!data || !data.news) throw new Error('Failed to load the news feed.');
      commit(FETCH_SUCCESS, data.news);
    } catch (err) {
      commit(FETCH_ERROR, err);
    }
  },
};

export default {
  mutations,
  actions,
  state: initialState,
  namespaced: true,
};
