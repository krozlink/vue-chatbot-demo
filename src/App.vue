<template>
  <div id="app">

    <div v-if="!isMinimized" id="chat-window" class="card">
      <header id="chat-header" class="card-header">
        <p class="card-header-title">
          Chat Bot
        </p>

        <span class="icon is-large chat-close" v-on:click="toggleWindow">
          <i class="mdi mdi-24px mdi-close-circle-outline"></i>
        </span>
      </header>

      <div v-if="loginState !== 'show_chat'" id="chat-login" class="card-content">
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <a v-if="loginState === 'loading'" class="button is-large is-info is-outlined is-loading">Login</a>

              <div v-if="loginState === 'show_login_form'">
                <p class="subtitle">Log in with your username and password</p>

                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input is-medium" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-24px mdi-account"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input is-medium"  type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-24px mdi-lock"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <button class="button is-info is-medium is-fullwidth" v-on:click="doLogin">
                     Login
                    </button>

                    <button class="button is-text is-fullwidth" v-on:click="signUp">
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>


              <div v-if="loginState === 'show_register_form'">
                <p class="subtitle">Sign up with a new account</p>

                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="register.user" type="text" placeholder="Username">
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-24px mdi-account"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input class="input is-medium" v-model="register.email" type="email" placeholder="Email Address">
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-24px mdi-email"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input is-medium" v-model="register.password" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="mdi mdi-24px mdi-lock"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-info is-medium is-fullwidth" v-on:click="doRegister">Sign Up</button>
                  </div>
                  <div class="control">
                    <button class="button is-text is-fullwidth" v-on:click="registerCancel">Login</button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>
      </div>

      <div v-if="loginState === 'show_chat'" id="chat-content" class="card-content">
        <article v-for="msg in $store.state.messages" :key="msg.id" class="message"
          :class="{
            'is-info': msg.type === 'bot',
            'bot': msg.type === 'bot',
            'is-success': msg.type === 'human',
            'human': msg.type === 'human',
          }">
          <div class="message-body">{{ msg.text }}</div>
        </article>
      </div>

      <footer v-if="loginState === 'show_chat'" id="chat-footer" class="card-footer">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              type="text"
              id="chat-message"
              v-model="message"
              v-on:keyup.enter="sendMessage"
              placeholder="Type a message to send">
          </div>
          <div class="control" id="chat-send">
            <a class="button" v-on:click="sendMessage">
              <i class="mdi mdi-24px mdi-send"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>

    <a v-if="isMinimized" id="chat-button" class="button" v-on:click="toggleWindow">
      <span class="icon is-large">
        <i class="mdi mdi-message mdi-36px"></i>
      </span>
    </a>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      message: '',

      login: {
        user: '',
        password: '',
      },
      register: {
        user: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    isMinimized() {
      return this.$store.state.isUIMinimized;
    },
    loginState() {
      return this.$store.state.loginState;
    },
  },
  methods: {
    toggleWindow() {
      this.$store.commit('toggleWindow');
    },
    sendMessage() {
      if (this.message !== '') {
        this.$store.dispatch('addMessage', this.message);
        this.message = '';
      }
    },
    registerCancel() {
      this.$store.commit('setLoginState', 'show_login_form');
    },
    doLogin() {
      this.$store.dispatch('login', { user: this.login.user, password: this.login.password });
    },
    doRegister() {
      this.$store.dispatch('register', { user: this.register.user, email: this.register.email, password: this.register.password });
    },
    signUp() {
      this.$store.commit('setLoginState', 'show_register_form');
    },
  },
};
</script>

<style lang="scss">

#chat-button {
  border-radius: 50%;
  position: fixed;

  right: 10px;
  bottom: 10px;

  width: 60px;
  height: 60px;

  border-width: 0px;

  background-color: $info;
  color: #EEE;
}

#chat:hover {
    background-color: $link;
    height: 65px;
    width: 65px;
    right: 8px;
    bottom: 8px;
}

section .hero-body {
  height: 50px;
  padding-top: 10px;
}

#chat-window {
  width: $chat-width;
  height: $chat-height;
  position: fixed;
  right: 10px;
  bottom: 10px;

  // height: 100%;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

#chat-login {
  padding: 0px;
  width: 100%;

  section {
    height: $chat-height - $header-height;

    div.hero-body{
      display: table-cell;
      vertical-align: middle;
      // text-align: center;
    }
  }

  div.container {
    display: inline-block;
    width: 100%;

    margin: auto;
    margin-top: 100px;
  }
}

#chat-header {
  background-color: $info;
  color: white;
  height: $header-height;

  p {
    color: white;
  }

  .icon {
    cursor: pointer;
  }
}

#chat-content {
  display: flex;
  flex: 1 1 90%;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow: auto;

  background-color: #FAFAFA;

  .message {
    width: 100%;
  }

  .message-body{
    border-width: 0 0 0 4px;
    padding: 0.5em 1.5em;
  }

  .human {
    text-align: right;

    .message-body{
      border-width: 0 4px 0 0;
    }
  }

  .bot {
    text-align: left;

    .message-body{
      border-width: 0 0 0 4px;
    }
  }
}

#chat-footer {
  display: flex;
  bottom: 0px;

  .field{
   width: 100%;
  }

  a.button {
    background-color: $info;
    color: white;
  }
}


</style>
