<template>
  <div class="home">
    <HeaderView />
    <LoginView />

    <MainView />
  </div>
</template>

<script>


export default {
  name: 'AppView',
  components: {
    'HeaderView': ()=>import('@/views/HeaderView'),
    'MainView': ()=>import('@/views/MainView'),
    'LoginView': ()=>import('@/views/LoginView'),
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
