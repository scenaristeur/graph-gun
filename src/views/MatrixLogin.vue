<template>
  <div>
    ------------------------
    <br><h2> Matrix Client</h2>
    provider :
    <input v-model="provider" placeholder="provider, ex: https://matrix.org" /><br>
    Login with token :
    <input v-model="token" placeholder="token" type="password" />
    <br>
    Or Login with userId / password :
    <input v-model="userId" placeholder="userId" />
    <input v-model="password" placeholder="password" type="password" /><br>
    <button @click="login">Login</button>
    <br>
    <br>
    <!-- {{state}} / {{prevState}} / {{res}} / <br> -->
    {{log}}
    <br>

    <div v-if="state=='PREPARED'">
      <input v-model="message2send" placeholder="message to Send" />
      <button @click="sendMessage" >Send to #test:matrix.org room </button>
      roomList : {{roomList}}
    </div>



    <br>
    <br>
  </div>
</template>

<script>
//https://github.com/matrix-org/matrix-js-sdk/blob/master/examples/node/app.js
//https://matrix.org/docs/guides/usage-of-the-matrix-js-sdk
// voip https://github.com/matrix-org/matrix-js-sdk/blob/master/examples/voip/browserTest.js
// https://syncedstore.org/docs/sync-providers
import sdk from 'matrix-js-sdk';

export default {
  name: "MatrixLogin",
  data(){
    return {
      provider: "https://matrix.org",
      token: "",
      userId: "@spoggy:matrix.org",
      password: "",
      client: null,
      state: null,
      // prevState: null,
      // res: null,
      log: null,
      message2send: "",
      roomList: {}
    }
  },
  methods: {
    async login(){
      if(this.token.length > 0){
        // console.log("login with token", this.token)
        this.log = "login with token"
        try{
          this.client = sdk.createClient({
            baseUrl: this.provider, //"https://matrix.org",
            accessToken: this.token,
            userId: this.userId //"@USERID:matrix.org"
          })
          this.log = "starting client"
          this.startClient()
        }catch(e){
          alert(e)
        }
      }else{
        this.log = "login with userId/password"
        this.client = sdk.createClient(this.provider);
        this.client.login("m.login.password", {"user": this.userId, "password": this.password}).then((response) => {
          //console.log(response.access_token);
          this.log = "getAccessToken"
          this.token = response.access_token //this.client.getAccessToken()
          this.login()
        });
      }

    },
    startClient(){
      this.client.startClient()
      let app = this
      app.log = "first sync, waiting for client to be ready"
      this.client.once('sync', function(state, prevState, res) {
        console.log(state, prevState, res); // state will be 'PREPARED' when the client is ready to use
        app.state = state
        // app.prevState = prevState
        // app.res = res
        app.log = "client ready"
        if (state == "PREPARED"){
          app.onClientReady()
          app.$store.commit('setUsername', app.userId)
        }
      });
    },
    onClientReady(){
      let app = this
      this.log = "client listening on events & room.timeline"
      this.client.on("event", function(event){
        console.log(event.getType());
        console.log(event);
        //this.$store.commit('newMatrixEvent', event)
        //  app.log = JSON.Stringify(event)
      })

      this.client.on("Room.timeline", function(event, room, toStartOfTimeline) {
        console.log(event.event, room, toStartOfTimeline);
        // let ev = {event: event, roorm: room, toStart: toStartOfTimeline}
        //  app.log = JSON.stringify(ev)
      });

      // this.initialRoomSync()

      var rooms = this.client.getRooms();
      console.log(rooms.length,rooms)
      // this.rooms = rooms.map(r => ({id: r.roomId, name: r.name, members: r.getJoinedMembers()}))
      rooms.forEach(room => {
        console.log(room.roomId, room);
        app.roomList[room.roomId] = {id: room.roomId, name: room.name/*, members: room.getJoinedMembers()*/}
        var members = room.getJoinedMembers();
        members.forEach(member => {
          console.log(member.name);
        });
        room.timeline.forEach(t => {
          console.log(JSON.stringify(t.event.content, t));
        });
      });

    },
    initialRoomSync(){
      // var testRoomId = "!AUyclzjhyJPgZJeNkW:matrix.org";
      var testRoomId = "!hCZXcwEEfmJWNeIGbo:matrix.org";

      this.client.initialRoomSync(testRoomId).then((res)=>{
        console.log("initialRoomSync", res)

      }).catch((err) => {
        console.log(err)
      })


    },
    sendMessage(){
      // https://tekos.gitbook.io/doc/building-apps-1/chat-surfaces/messages/instant-messaging/message-types#m.file

      // var testRoomId = "!AUyclzjhyJPgZJeNkW:matrix.org";
      var testRoomId = "!hCZXcwEEfmJWNeIGbo:matrix.org";
      // let body = this.message2send
      // var content = {
      //   "body": this.message2send,
      //   "msgtype": "m.text"
      // };
      let node = {
        id: 1234,
        label: this.message2send
      }


      var content =   {
        "body": JSON.stringify(node),
        // "format": "org.matrix.custom.html",
        // "formatted_body": "<b>This is an example text message</b>",
        "msgtype": "m.text"
      }

      console.log(content)
      this.client.sendEvent(testRoomId, "m.room.message", content, "").then((res)=>{
        console.log("message send sucessfully", res)
        this.message2send = ""
      }).catch((err) => {
        console.log(err)
      })

    }
  }
}
</script>

<style>

</style>
