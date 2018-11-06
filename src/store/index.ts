import { Fetch } from '@/createFetch';
import runtime, { State as RuntimeState } from './runtime';
import news, { State as NewsState } from './news';

export interface State {
  app: {
    apiUrl: string;
    googleTrackingId?: string;
  };
  me?: {
    id: string;
    email: string;
  };
  runtime: RuntimeState;
  news: NewsState;
}

export interface Getters {
  fetch: Fetch;
}

export default {
  runtime,
  news,
};
