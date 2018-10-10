import { Fetch } from '@/createFetch';
import news, { State as NewsState } from './news';

export interface State {
  app: {
    apiUrl: string;
  };
  me?: {
    id: string;
    email: string;
  };
  news: NewsState;
}

export interface Getters {
  fetch: Fetch;
}

export default {
  news,
};
