<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <HeaderView />
    <LoginView />
    <ConfigView />
    <ChatView />
    <GraphView />


  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {
    'HeaderView': ()=>import('@/views/HeaderView'),
    'ChatView': ()=>import('@/views/ChatView'),
    'GraphView': ()=>import('@/views/GraphView'),
    'LoginView': ()=>import('@/views/LoginView'),
    'ConfigView': ()=>import('@/views/ConfigView'),
    // 'DataCaching': ()=>import('@/views/experiments/DataCaching'),
    // 'LevelgraphJsonld': ()=>import('@/views/experiments/LevelgraphJsonld'),
  },
}
</script>
<style>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
}
</style>
