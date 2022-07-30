<template>
  <div>


    <input type="radio" id="matrix" value="matrix" v-model="network">
    <label for="matrix">Matrix</label>
    <br>
    <input type="radio" id="gundb" value="gundb" v-model="network">
    <label for="gundb">GunDb</label>
    <br>
    <span>Choisi : {{ network }}</span>

    <GunLogin v-if="network == 'gundb'"/>
    <MatrixLogin v-if="network== 'matrix'"/>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {
    'GunLogin': ()=>import('@/views/GunLogin'),
    'MatrixLogin': ()=>import('@/views/MatrixLogin'),
  },
  data(){
    return{
      network: "matrix"
    }
  },
  watch:{
    network(){
      this.$store.commit('setNetwork', this.network)
    }
  }
}
</script>

<style>

</style>
