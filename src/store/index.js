import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages : [],
    db : undefined,
    user : undefined,
    username: undefined
  },
  getters: {
  },
  mutations: {
    setDb(state, db){
      state.db = db
      console.log("db",db)
    },
    setUser(state, u){
      state.user = u
      console.log(u)
    },
    setUsername(state, n){
      state.username = n
      console.log(n)
    },
  },
  actions: {

  },
  modules: {
  }
})
