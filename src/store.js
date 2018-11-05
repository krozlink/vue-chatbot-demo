import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './api/auth';

Vue.use(Vuex);

const FORM_STATE = {
  LOADING: 'loading',
  SHOW_LOGIN_FORM: 'show_login_form',
  SHOW_REGISTER_FORM: 'show_register_form',
  SHOW_CHAT: 'show_chat',
};

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    loginState: FORM_STATE.SHOW_REGISTER_FORM,
    isUIMinimized: false,
    currentId: 2,
    messages: [
      {
        id: 1,
        timestamp: new Date(),
        text: 'Hello',
        type: 'human',
        dialogState: '',
      },
      {
        id: 2,
        timestamp: new Date(),
        text: 'How can I help?',
        type: 'bot',
        dialogState: '',
      },
    ],
    config: {
      cognito: {
        appDomainName: '',
        appUserPoolClientId: '',
        appUserPoolName: '',
        poolId: '',
      },
      lex: {
        botAlias: '',
        botName: '',
        initialText: '',
      },
      ui: {
        pageTitle: '',
        inputPlaceholder: '',
      },
    },
  },
  actions: {
    addMessage({ commit }, text) {
      commit('addMessage', { type: 'human', text });
    },
    login({ commit }, { user, password }) {

    },
    register({ commit }, { user, email, password }) {

    },
  },
  mutations: {
    addMessage(state, { type, text }) {
      state.currentId += 1;
      state.messages.push({
        type,
        text,
        dialogState: '',
        id: state.currentId,
        timestamp: new Date().getTime(),
      });
    },
    toggleWindow(state) {
      state.isUIMinimized = !state.isUIMinimized;
    },
    setLoginState(state, loginStatus) {
      state.loginState = loginStatus;
    },
  },
});
