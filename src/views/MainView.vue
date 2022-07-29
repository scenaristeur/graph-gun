<template>
  <div>{{ room }} :
    {{ messages}}
    <ChatView />
    <GraphView />
  </div>
</template>

<script>
export default {
  name: "MainVue",
  components: {
    'ChatView': ()=>import('@/views/ChatView'),
    'GraphView': ()=>import('@/views/GraphView'),
  },
  computed: {
    room() {
      return this.$store.state.room
    },
    messages() {
      return this.$store.state.messages
    },
  }
}
</script>

<style>

</style>
