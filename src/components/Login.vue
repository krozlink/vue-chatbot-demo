<template>
    <div id="login-form">
        <p class="subtitle">Log in with your username and password</p>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" v-model="user" type="text" placeholder="Username">
            <span class="icon is-small is-left">
                <i class="mdi mdi-24px mdi-account"></i>
            </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
            <input class="input is-medium" v-model="password" type="password" placeholder="Password">
            <span class="icon is-small is-left">
                <i class="mdi mdi-24px mdi-lock"></i>
            </span>
            </p>
        </div>
        <div class="field">
            <p class="control">
            <button class="button is-info is-medium is-fullwidth"
              v-on:click="doLogin"
              :class="{
                'is-loading': this.$store.state.login.state === 'logging_in'
              }"
            >
                Login
            </button>

            <button class="button is-text is-fullwidth" v-on:click="signUp">
                Sign Up
            </button>
            </p>
        </div>

        <article class="message is-danger" v-if="this.$store.state.login.error !== ''">
          <div class="message-body">
            {{this.$store.state.login.error}}
          </div>
        </article>
    </div>
</template>

<script>
export default {
  data() {
      return {
          user: '',
          password: '',
      };
  },
  methods: {
    doLogin() {
      this.$store.dispatch('login', { user: this.user, password: this.password });
    },
    signUp() {
      this.$store.commit('setPageState', 'show_register_form');
    },
  }
}
</script>


<style>

</style>
