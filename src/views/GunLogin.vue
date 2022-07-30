<template>
  <div v-if="username == undefined || username.length == 0 ">
    <input v-model="usernameInput" placeholder="username" />
    <input v-model="passwordInput" placeholder="password" type="password"/>
    <button @click="login">login</button>
    <button @click="signup">sign up</button>
    <ConfigView />
  </div>
</template>

<script>
export default {
  name: "GunLogin",
  components: {
    'ConfigView': ()=>import('@/views/ConfigView'),
  },
  data(){
    return {
      usernameInput: undefined,
      passwordInput: undefined
    }
  },
  methods:{
    login(){
      console.log("login")
      this.user.auth(this.usernameInput, this.passwordInput, ({ err }) => err && alert(err));
    },
    signup(){
      console.log("signup")
      this.user.create(this.usernameInput, this.passwordInput, ({ err }) => {
        if (err) {
          alert(err);
        } else {
          this.login();
        }
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    username() {
      return this.$store.state.username
    },
  }
}
</script>

<style>

</style>
