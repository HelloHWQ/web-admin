import Vue from 'vue'
import Router from 'vue-router'
import Stroe from './store.js'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Forget from './views/Forget.vue'
import Register from './views/Register.vue'
import EditPwd from './views/EditPwd.vue'
import HomeConsole from './views/HomeConsole.vue'
import UserInfo from './views/UserInfo.vue'
import NotFound from './views/404.vue'
import CmpError from './views/error.vue'

import Common from './assets/js/checkStorage.js';
import axios from './assets/js/ajax.js';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        needLogin: true // 需要登录
      },
      children: [
        {
          path: 'console',
          component: HomeConsole,
          meta: {
            needLogin: true, // 需要登录
            code: 'console',
            title: '控制台'
          }
        },
        {
          path: 'userinfo',
          component: UserInfo,
          meta: {
            needLogin: true, // 需要登录
            code: 'userinfo',
            title: '基本资料'
          }
        },
        {
          path: '',
          component: HomeConsole,
          meta: {
            needLogin: true,
            code: 'console',
            title: '控制台'
          }
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/editpwd',
      name: 'editpwd',
      component: EditPwd,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/error',
      component: CmpError
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  var username = Common.isLogin();
  var user = Common.getUserInfo();
  let isLogin = username!="";
  if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
    if (isLogin) { // 判断是否已经登录
      if(!user) {
        // 用户信息不存在
        if (username) {
          axios
            .get("/api/user/" + username)
            .then(response => {
              if (response.status == "200") {
                user = response.data;
                user.usercode = user.code;
                localStorage.setItem('curuser',JSON.stringify(user));
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
      // 对/home的子路由做处理
      if(to.path.indexOf('/home/')>-1) {
        var code = to.meta.code;
        var title = to.meta.title;
        var url = to.path;
        Stroe.commit('AddTab',{code,title,url,show: true});
      }
      //给store存值
      Stroe.commit('login',{usercode: username});
      next()
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next()
  }
});

export default router;
