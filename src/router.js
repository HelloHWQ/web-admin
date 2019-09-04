import Vue from 'vue'
import Router from 'vue-router'
import Stroe from './store.js'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Forget from './views/Forget.vue'
import Register from './views/Register.vue'
import EditPwd from './views/EditPwd.vue'

import Common from './assets/js/checkStorage.js';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '主页',
        keepAlive: true, // 需要被缓存
        needLogin: true // 需要登录
      }
    },
    {
      path: '/',
      component: Home,
      meta: {
        needLogin: true // 需要登录
      }
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
      path: '/*',
      redirect: 'home'
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  var username = Common.isLogin();
  let isLogin = username!="";
  if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
    if (isLogin) { // 判断是否已经登录
      //给store存值
      Stroe.commit('login',{username: username});
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
