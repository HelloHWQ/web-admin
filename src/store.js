import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CurrentUser: null,
    isLogin: false,
    homeShowLeft: false,       //个人中心主页显示/隐藏侧边菜单
    weburl: 'http://www.layui.com/admin/',   // web前台地址
    HeadTabList: [

    ],            // 个人中心主页Tab列表
  },
  mutations: {
    login(state, user) {
      state.CurrentUser = user;
      state.isLogin = true;
    },
    exit(state) {
      state.CurrentUser = null;
      state.isLogin = false;
      localStorage.removeItem('name');
      localStorage.removeItem('pwd');
      localStorage.removeItem('curuser');
    },
    setShowLeft(state, flag) {
      state.homeShowLeft = flag;
    },
    AddTab(state, obj) {
      if (obj) {
        var flag = false;
        state.HeadTabList.forEach(item => {
          item.show = false;
          if(obj.code == item.code) {
            item.show = true;
            flag = true;
          }
        })
        // 判断HeadTabList 是否已存在，如果存在激活即可
        if(flag == false) {
          state.HeadTabList.push(obj);
        }
      }
    },
    DelTab(state, code) {
      if (code) {
        state.HeadTabList.forEach((item,index) => {
          if (item.code == code) {
            state.HeadTabList.splice(index,1);
            return;
          }
        })
      }
    },
    UpdateTab(state, code) {
      if (code) {
        state.HeadTabList.forEach(item => {
          if (item.code == code) {
            item.show = true;
          } else {
            item.show = false;
          }
        })
      }
    }
  },
  actions: {

  }
})
