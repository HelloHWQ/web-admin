import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/layui.css'
import './assets/css/admin.css'
import "./assets/css/login.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './assets/js/ajax.js'

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(ElementUI)
let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm;
