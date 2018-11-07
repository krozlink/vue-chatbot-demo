<template>
    <div id="register-form">
        <p class="subtitle">Sign up with a new account</p>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" v-model="user" type="text" placeholder="Username">
            <span class="icon is-small is-left">
                <i class="mdi mdi-24px mdi-account"></i>
            </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" v-model="email" type="email" placeholder="Email Address">
            <span class="icon is-small is-left">
                <i class="mdi mdi-24px mdi-email"></i>
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
            <div class="control">
            <button class="button is-info is-medium is-fullwidth" v-on:click="doRegister">Sign Up</button>
            </div>
            <div class="control">
            <button class="button is-text is-fullwidth"
              v-on:click="registerCancel"
              :class="{
                'is-loading': this.$store.state.register.state === 'registering'
              }"
            >Login</button>
            </div>
        </div>

        <article class="message is-danger" v-if="this.$store.state.register.error !== ''">
          <div class="message-body">
            {{this.$store.state.register.error}}
          </div>
        </article>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      email: '',
      password: '',
    };
  },
  methods: {
    registerCancel() {
      this.$store.commit('setPageState', 'show_login_form');
    },
    doRegister() {
      this.$store.dispatch('register', { user: this.user, email: this.email, password: this.password });
    },
  }
}
</script>


<style>

</style>
