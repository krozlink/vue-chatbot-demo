import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './api/auth';
import Lex from './api/lex';
import { stat } from 'fs';

Vue.use(Vuex);

const PAGE_STATE = {
  LOADING: 'loading',
  SHOW_LOGIN_FORM: 'show_login_form',
  SHOW_REGISTER_FORM: 'show_register_form',
  SHOW_CHAT: 'show_chat',
  SHOW_REGISTER_CONFIRM: 'show_register_confirm',
};

const LOGIN_STATE = {
  NOT_LOGGED_IN: 'not_logged_in',
  LOGGING_IN: 'logging_in',
  LOGGED_IN: 'logged_in',
}

const REGISTER_STATE = {
  UNREGISTERED: 'unregistered',
  REGISTERING: 'registering',
  UNCONFIRMED: 'unconfirmed',
  CONFIRMING: 'confirming',
  CONFIRMED: 'registered',
}

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},

    login: {
      error: '',
      state: '',
    },
    register: {
      error: '',
      state: '',
    },

    pageState: PAGE_STATE.LOADING,

    register_error: '',

    isUIMinimized: false,
    currentId: 0,
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
    sendMessage({commit}, {text, container}) {
      return new Promise((resolve, reject) => {
        commit('addMessage', { type: 'human', text, container });

        Lex.SendMessage(text)
          .then(result => {
            commit('addMessage', { type: 'bot', text: result.message, container });
            resolve(result);
          })
          .catch(err => {
            commit('addMessage', { type: 'bot', text: err.message, error: true, container });
            resolve(err);
          });  
      });
    },
    login({ commit }, { user, password }) {
      commit('setLoginState', LOGIN_STATE.LOGGING_IN);
      Auth.Login(user, password)
        .then(user => {
          console.log('logged in successfully');
          commit('loginSuccessful', user);
        })
        .catch(err => {
          commit('loginFailed', err.message);
        });
    },
    register({ commit }, { user, email, password }) {
      commit('setRegisterState', REGISTER_STATE.REGISTERING);
      Auth.Register(user, email, password)
        .then(result => {

        })
        .catch(err => {
          commit('registerFailed', err.message);
        });
    },
    autoLogin({ commit }) {
      Auth.GetCurrentUser()
        .then(user => {
          commit('loginSuccessful', user);
        })
        .catch(err => {
          commit('loginFailed', '');
        });
    },
  },
  mutations: {
    addMessage(state, { type, text, error, container }) {
      state.currentId += 1;
      state.messages.push({
        type,
        text,
        dialogState: error ? 'error' : '',
        id: state.currentId,
        timestamp: new Date().getTime(),
      });

      Vue.nextTick(() => {
        container.scrollTop = container.scrollHeight;
      });
    },
    toggleWindow(state) {
      state.isUIMinimized = !state.isUIMinimized;
    },
    setPageState(state, loginStatus) {
      state.pageState = loginStatus;
    },


    
    setRegisterState(state, registerState) {
      state.register.state = registerState;
    },
    registerFailed(state, message ) {
      state.register.error = message;
      state.register.state  = REGISTER_STATE.UNREGISTERED;
    },
    registerSuccessful(state) {
      state.register.error = ''
      state.register.state = REGISTER_STATE.UNCONFIRMED;
    },

    
    setLoginState(state, loginState) {
      state.login.state = loginState;
    },
    loginFailed(state, message) {
      state.pageState  = PAGE_STATE.SHOW_LOGIN_FORM;
      state.user = {};
      state.login.error = message;
      state.login.state = LOGIN_STATE.NOT_LOGGED_IN;
      state.isLoggedIn = false;
    },
    loginSuccessful(state, user) {
      state.pageState = PAGE_STATE.SHOW_CHAT;
      state.user = user;
      state.login.error = '';
      state.login.state = LOGIN_STATE.LOGGED_IN;
      state.isLoggedIn = true;
    },
  },
});
