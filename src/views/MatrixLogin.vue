<template>
  <div>
    <br><h2> Matrix Client</h2>
    Login with token :<br>
    <input v-model="token" placeholder="token" />
    <br>
    Or Login with user / password :<br>
    <input v-model="user" placeholder="user" />
    <input v-model="password" placeholder="password" type="password" /><br>
    <button @click="login">Login</button>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "MatrixLogin",
  data(){
    return {
      token: "",
      user: "",
      password: ""
    }
  },
  methods: {
    login(){
      if(this.token.length > 0){
        console.log("login with token", this.token)
      }else{
        console.log("login with user/ password", this.user, this.password)
      }
    }
  }
}
</script>

<style>

</style>
