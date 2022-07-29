<template>
  <div>
    Config
    peers
    <input v-model="roomValue" placeholder="room" />
    <button @click="setRoom">set room</button>
  </div>
</template>

<script>
import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

export default {
  name: "ConfigView",
  data(){
    return{
      roomValue : "chat"
    }
  },
  mounted(){
    let db = GUN([
      'https://spogg.herokuapp.com/gun',
      'http://localhost:8765/gun',
      'https://gun-manhattan.herokuapp.com/gun'/*,
      'http://gunjs.herokuapp.com/gun/'*/
    ])
    let user = db.user().recall({sessionStorage: true});
    this.$store.commit('setDb',  db)
    this.$store.commit('setUser',  user)
    user.get('alias').on(v => {
      this.$store.commit('setUsername', v)
    })
    db.on('auth', async() => {
      const alias = await user.get('alias'); // username string
      // username.set(alias);

      console.log(`signed in as ${alias}`);
      this.$store.commit('setUsername', alias)
    });

    // console.log("user", user)
    if (this.room == ""){ this.setRoom()}
  },
  methods: {
    setRoom(){
      this.$store.commit('setRoom', this.roomValue)
    }
  },
  watch:{
    room(){
      this.roomValue = this.room
      console.log("rv",this.roomValue)
    }
  },
  computed: {
    room(){
      return this.$store.state.room
    },
  }
}
</script>

<style>

</style>
