import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CurrentUser: null,
    isLogin: false,
    homeShowLeft: false,       //个人中心主页显示/隐藏侧边菜单
    weburl: 'http://www.layui.com/admin/',   // web前台地址
  },
  mutations: {
    login (state, user) {
      state.CurrentUser = user;
      state.isLogin = true;
    },
    exit (state) {
      state.CurrentUser = null;
      state.isLogin = false;
      localStorage.removeItem('name');
      localStorage.removeItem('pwd');
    },
    setShowLeft (state,flag) {
      state.homeShowLeft = flag;
    }
  },
  actions: {

  }
})
