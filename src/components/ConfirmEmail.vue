<template>
    <div id="register-form">
        <p class="subtitle">A verification code has been sent to your email address. Enter it below to confirm your account.</p>

        <div class="field">
            <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" v-model="verification_code" type="password" placeholder="Verification Code">
            <span class="icon is-small is-left">
                <i class="mdi mdi-24px mdi-lock-open"></i>
            </span>
            </p>
        </div>
        <div class="field">
            <div class="control">
            <button class="button is-info is-medium is-fullwidth" v-on:click="confirmAccount">Confirm Account</button>
            </div>
            <div class="control">
                <button class="button is-text is-fullwidth" v-on:click="resendCode">Resend Code</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      verification_code: ''
    };
  },
  methods: {
    resendCode() {
      this.$store.commit('setPageState', 'show_login_form');
    },
    confirmAccount() {
      this.$store.dispatch('register', { user: this.user, email: this.email, password: this.password });
    },
  }
}
</script>


<style>

</style>
