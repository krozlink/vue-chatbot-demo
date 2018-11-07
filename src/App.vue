<template>
  <div id="app">

    <div v-if="!isMinimized" id="chat-window" class="card">
      <header id="chat-header" class="card-header">
        <p class="card-header-title">Xena - Warrior Chat Bot </p>
        <span class="icon is-large chat-close" v-on:click="toggleWindow">
          <i class="mdi mdi-24px mdi-close-circle-outline"></i>
        </span>
      </header>

      <div v-if="pageState !== 'show_chat'" id="chat-forms" class="card-content">
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <a v-if="pageState === 'loading'" id="chat-loading" class="button is-large is-info is-outlined is-loading">Login</a>
              <login v-if="pageState === 'show_login_form'"></login>
              <register v-if="pageState === 'show_register_form'"> </register>
              <confirm-email v-if="pageState === 'show_register_confirm'"> </confirm-email>
            </div>
          </div>
        </section>
      </div>

      <div v-if="pageState === 'show_chat'" id="chat-content" class="card-content" ref="chat">
        <article v-for="msg in $store.state.messages" :key="msg.id" class="message"
          :class="{
            'is-info': msg.type === 'bot' && msg.dialogState !== 'error',
            'bot': msg.type === 'bot',
            'is-success': msg.type === 'human' && msg.dialogState !== 'error',
            'human': msg.type === 'human',

            'is-danger': msg.dialogState === 'error',
          }">
          <div class="message-body">{{ msg.text }}</div>
        </article>
      </div>

      <footer v-if="pageState === 'show_chat'" id="chat-footer" class="card-footer">
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
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ConfirmEmail from './components/ConfirmEmail.vue';

export default {
  name: 'app',
  components: {
    Login,
    Register,
    ConfirmEmail,
  },
  data() {
    return {
      message: '',
    };
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  computed: {
    isMinimized() {
      return this.$store.state.isUIMinimized;
    },
    pageState() {
      return this.$store.state.pageState;
    },
  },
  methods: {
    toggleWindow() {
      this.$store.commit('toggleWindow');
      if(!this.$store.state.isUIMinimized) {
        
        setTimeout(() =>{
          const container = this.$el.querySelector('#chat-content');
          container.scrollTop = container.scrollHeight;
        });
      }
    },
    sendMessage() {
      if (this.message !== '') {
        this.$store.dispatch('sendMessage', {text: this.message, container: this.$el.querySelector('#chat-content')});
        this.message = '';
      }
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

#chat-forms {
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

#chat-loading {
  display: block;
  width: 100px;
  margin: auto;
}
</style>
