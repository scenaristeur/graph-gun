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

    this.getMessages()

  },
  methods: {
    setRoom(){
      this.$store.commit('setRoom', this.roomValue)
      this.getMessages()
    },
    getMessages(){
      let messages = []
//       let scrollBottom;
// let lastScrollTop;
//let canAutoScroll = true;
// let unreadMessages = false;
        if (this.room == ""){ this.setRoom()}
      var match = {
  // lexical queries are kind of like a limited RegEx or Glob.
  ".": {
    // property selector
    ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
  },
  "-": 1, // filter in reverse
};
      // Get Messages
      this.$store.state.db.get(this.$store.state.room)
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const key = "#foo";

          var message = {
            // transform the data
            who: await this.$store.state.db.user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await window.SEA.decrypt(data.what, key)) + "", // force decrypt as text.
            when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
            id: id,
          };

          if (message.what) {
            messages = [...messages.slice(-100), message].sort(
              (a, b) => a.when - b.when
            );
            this.$store.commit('setMessages', messages)
            // if (canAutoScroll) {
            //   autoScroll();
            // } else {
            //   unreadMessages = true;
            // }
          }
        }
      });
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
