<template>
  <div>
    <input v-model="username" placeholder="username" />
    <input v-model="password" placeholder="password" type="password"/>
    <button @click="login">login</button>
    <button @click="signup">sign up</button>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data(){
    return {
      username: undefined,
      password: undefined
    }
  },
  methods:{
    login(){
      console.log("login")
      this.user.auth(this.username, this.password, ({ err }) => err && alert(err));
    },
    signup(){
      console.log("signup")
      this.user.create(this.username, this.password, ({ err }) => {
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
  }
}
</script>

<style>

</style>
