import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isUIMinimized: false,
    messages: [],
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

  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    },
  },
});
