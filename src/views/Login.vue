<template>
  <div class="layadmin-tabspage-none">
    <div class="layadmin-user-login layadmin-user-display-show" id="LAY-user-login">
      <div class="layadmin-user-login-main">
        <Header></Header>
        <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
          <div class="layui-form-item">
            <label
              class="layadmin-user-login-icon layui-icon layui-icon-username"
              for="LAY-user-login-username"
            ></label>
            <input
              type="text"
              name="username"
              required
              placeholder="用户名"
              class="layui-input"
              v-model="username"
            />
          </div>
          <div class="layui-form-item">
            <label
              class="layadmin-user-login-icon layui-icon layui-icon-password"
              for="LAY-user-login-password"
            ></label>
            <input
              type="password"
              name="password"
              required
              placeholder="密码"
              class="layui-input"
              v-model="password"
            />
          </div>
          <div class="layui-form-item">
            <div class="layui-row">
              <div class="layui-col-xs7">
                <label
                  class="layadmin-user-login-icon layui-icon layui-icon-vercode"
                  for="LAY-user-login-vercode"
                ></label>
                <input
                  type="text"
                  name="vercode"
                  required
                  placeholder="图形验证码"
                  class="layui-input"
                  v-model="vercode"
                />
              </div>
              <div class="layui-col-xs5">
                <div style="margin-left: 10px;">
                  <img
                    src="https://www.oschina.net/action/user/captcha"
                    class="layadmin-user-login-codeimg"
                    id="LAY-user-get-vercode"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="layui-form-item" style="margin-bottom: 20px;">
            <input type="checkbox" name="remember" lay-skin="primary" title="记住密码" />
            <div
              class="layui-unselect layui-form-checkbox"
              :class="{'layui-form-checked': remember}"
              lay-skin="primary"
            >
              <span>记住密码</span>
              <i class="layui-icon layui-icon-ok" @click="remember=!remember"></i>
            </div>
            <router-link
              tag="a"
              to="/forget/Z"
              class="layadmin-user-jump-change layadmin-link"
              style="margin-top: 7px;"
            >忘记密码？</router-link>
          </div>
          <div class="layui-form-item">
            <button class="layui-btn layui-btn-fluid" @click="Login">登 录</button>
          </div>
          <OtherLoginType type="Login" title="社交账号登录"></OtherLoginType>
        </div>
      </div>

      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/LoginHead.vue";
import OtherLoginType from "@/components/OtherLoginType.vue";
import axios from "../assets/js/ajax.js";
import crypto from "../assets/js/secret.js";

export default {
  data: function() {
    return {
      remember: false,
      username: "",
      password: "",
      vercode: ""
    };
  },
  components: {
    Footer,
    Header,
    OtherLoginType
  },
  mounted() {
    // 获取是否记录了密码
    this.remember = Boolean(localStorage.getItem("remember"));
    if (this.remember === true) {
      this.username = crypto.Decrypt(localStorage.getItem("name")) || "";
      this.password = crypto.Decrypt(localStorage.getItem("pwd")) || "";
    }
  },
  methods: {
    Login() {
      if (this.username == "" || this.password == "") {
        this.$message({
          message: "用户名或密码不能为空",
          type: "warning",
          center: true
        });
        return;
      }
      let that = this;
      axios
        .post('/api/user', {
          code: this.username,
          password: this.password,
          name: 'login'
        })
        .then(function(response) {
          if (response.status == '200' && response.data == '3') {
            that.rememberSecret(that.remember);
            // 保存登录状态
            that.$store.commit('login',{username: that.username});
            that.$router.push({ name: 'home' });
          } else {
            that.$message({
              message: '用户名或密码不正确！',
              type: 'error',
              center: true
            });
          }
        });
    },
    rememberSecret(isremember) {
      if (isremember === true) {
        // 记住用户名和密码
        let name = crypto.Encrypt(this.username);
        let pwd = crypto.Encrypt(this.password);
        localStorage.setItem("name", name);
        localStorage.setItem("pwd", pwd);
        localStorage.setItem("remember", isremember);
      } else {
        localStorage.setItem("name", "");
        localStorage.setItem("pwd", "");
        localStorage.setItem("remember", isremember);
      }
    }
  },
  watch: {
    remember: function(nval, oval) {
      this.rememberSecret(nval);
    }
  }
};
</script>


<style>
.layui-side-menu,
.layadmin-pagetabs .layui-tab-title li:after,
.layadmin-pagetabs .layui-tab-title li.layui-this:after,
.layui-layer-admin .layui-layer-title,
.layadmin-side-shrink
  .layui-side-menu
  .layui-nav
  > .layui-nav-item
  > .layui-nav-child {
  background-color: #20222a !important;
}
.layui-nav-tree .layui-this,
.layui-nav-tree .layui-this > a,
.layui-nav-tree .layui-nav-child dd.layui-this,
.layui-nav-tree .layui-nav-child dd.layui-this a {
  background-color: #009688 !important;
}
.layui-layout-admin .layui-logo {
  background-color: #20222a !important;
}
</style>

