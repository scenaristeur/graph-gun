<template>
  <div v-if="username">
    <!-- {{ room }} : -->
    <!-- {{ messages}} -->
    <InputView />

    <GraphView />
    <ChatView />
  </div>
</template>

<script>
export default {
  name: "MainVue",
  components: {
    'ChatView': ()=>import('@/views/ChatView'),
    'GraphView': ()=>import('@/views/GraphView'),
    'InputView': ()=>import('@/views/InputView'),
  },
  computed: {
    room() {
      return this.$store.state.room
    },
    username(){
      return this.$store.state.username
    },
    messages() {
      return this.$store.state.messages
    },
  }
}
</script>

<style>

</style>
