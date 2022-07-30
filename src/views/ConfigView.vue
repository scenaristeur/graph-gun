<template>
  <div>
    Config Gun 
    <input v-model="roomValue" placeholder="room" />
    <button @click="setRoom">set room</button>
  </div>
</template>

<script>
import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
//Warning: JSON blocking CPU detected. Add `gun/lib/yson.js` to fix.
import 'gun/lib/yson.js'

//QuotaExceededError: The quota has been exceeded. Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install
import 'gun/lib/radix.js'
import 'gun/lib/radisk.js'
import 'gun/lib/store.js'
import 'gun/lib/rindexed.js'

export default {
  name: "ConfigView",
  data(){
    return{
      roomValue : "chat"
    }
  },
  mounted(){
    let db = GUN(
      {localStorage: false,
      peers : [
        'https://spogg.herokuapp.com/gun',
        'http://localhost:8765/gun',
        'https://gun-manhattan.herokuapp.com/gun'/*,
        'http://gunjs.herokuapp.com/gun/'*/
      ]
    })
      let user = db.user().recall({sessionStorage: true});
      this.$store.commit('setDb',  db)
      this.$store.commit('setUser',  user)
      user.get('alias').on(v => {
        this.$store.commit('setUsername', v)
      })
      db.on('auth', async() => {
        const alias = await user.get('alias'); // username string
        console.log(`signed in as ${alias}`);
        if(alias.length > 0){
          this.$store.commit('setUsername', alias)
          this.getMessages()
        }else{
          alert('signed in as '+alias)
        }
      });
    },
    methods: {
      setRoom(){
        this.$store.commit('setRoom', this.roomValue)
        this.getMessages()
      },
      getMessages(){
        let messages = []
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
