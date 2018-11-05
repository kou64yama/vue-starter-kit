import { Commit } from 'vuex';

export const SET_VARIABLE = 'SET_VARIABLE';

export interface State {
  [name: string]: any;
}

interface SetVariablePayload {
  name: string;
  value: any;
}

interface SetVariableContext {
  commit: Commit;
}

export const initialState: () => State = () => ({});

export const mutations = {
  [SET_VARIABLE](state: State, { name, value }: SetVariablePayload) {
    state[name] = value;
  },
};

export const actions = {
  setVariables({ commit }: SetVariableContext, payload: SetVariablePayload) {
    commit(SET_VARIABLE, payload);
  },
};

export default {
  mutations,
  actions,
  state: initialState,
  namespaced: initialState,
};
