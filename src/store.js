import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CurrentUser: null,
    isLogin: false
  },
  mutations: {
    login (state, user) {
      state.CurrentUser = user;
      state.isLogin = true;
    },
    exit (state) {
      state.CurrentUser = null;
      state.isLogin = false;
    }
  },
  actions: {

  }
})
