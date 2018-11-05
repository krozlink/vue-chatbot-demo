<template>
  <div id="app">

    <div v-if="!isMinimized" id="chat-window" class="card">
      <header id="chat-header" class="card-header">
        <p class="card-header-title">
          Chat Bot
        </p>

        <span class="icon is-large chat-close" v-on:click="minimize">
          <i class="mdi mdi-24px mdi-close-circle-outline"></i>
        </span>
      </header>

      <div id="chat-content" class="card-content">
        <article class="message bot is-info">
          <div class="message-body">test</div>
        </article>
        <article class="message user is-success">
          <div class="message-body">test</div>
        </article>
        <article class="message bot is-info">
          <div class="message-body">test</div>
        </article>
      </div>

      <footer id="chat-footer" class="card-footer">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Type a message to send">
          </div>
          <div class="control" id="chat-send">
            <a class="button">
              <i class="mdi mdi-24px mdi-send"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>

    <a v-if="isMinimized" id="chat-button" class="button" v-on:click="maximize">
      <span class="icon is-large">
        <i class="mdi mdi-send mdi-36px"></i>
      </span>
    </a>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  computed: {
    isLoggedIn() {
      return false;
    },
    isMinimized() {
      return false;
    },
  },
  methods: {
    maximize() {

    },
    minimize() {

    },
  },
};
</script>

<style lang="scss">

#app {
  .chat-window {

  }
}

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

#chat-header {
  background-color: $info;
  color: white;

  p {
    color: white;
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

  .user {
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
