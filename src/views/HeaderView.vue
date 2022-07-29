<template>
  <header>
    <h1>🔫💬</h1>
    <div v-if="username" class="user-bio">


      <span>Hello <strong>{{username}}</strong></span>
      <img :src="'https://avatars.dicebear.com/api/initials/'+username+'.svg'" alt="avatar" />
      <button class="signout-button" @click="signout">Sign Out</button>
    </div>
    <h3 v-else>GraphGunChat</h3>

  </header>
</template>

<script>
export default {
  name: "HeaderView",
  methods: {
    signout() {
      this.user.leave();
      this.$store.commit('setUsername', '')
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    user() {
      return this.$store.state.user
    },
  }
}
</script>

<style>

</style>
