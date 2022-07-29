<template>
  <form @submit.prevent="sendMessage">
        <input
          type="text"
          placeholder="Type a message..."
          v-model="newMessage"
          maxlength="100" />

        <button type="submit" :disabled="!newMessage">💥</button>
      </form>
</template>

<script>
export default {
  name: "ChatView",
  data(){
    return{
      newMessage: ""
    }
  },
  methods:{
    async sendMessage() {
    const secret = await window.SEA.encrypt(this.newMessage, "#foo");
    const message = this.$store.state.user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    console.log(index, message)
    this.$store.state.db.get(this.$store.state.room).get(index).put(message);
    this.newMessage = "";
    // canAutoScroll = true;
    // autoScroll();
  }
  }
}
</script>

<style>

</style>
