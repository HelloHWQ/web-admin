import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/layui.css'
import './assets/css/admin.css'
import "./assets/css/login.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
