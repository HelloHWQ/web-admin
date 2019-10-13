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
              @keyup.enter="Login"
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
              @keyup.enter="Login"
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
                  @keyup.enter="Login"
                />
              </div>
              <div class="layui-col-xs5">
                <div style="margin-left: 10px;">
                  <Sidentify @refresh="refreshcode" :identifyCode="identifyCode"></Sidentify>
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
import crypto from "../assets/js/secret.js";
import Sidentify from "@/components/identify.vue";

export default {
  data: function() {
    return {
      remember: false,
      username: "",
      password: "",
      vercode: "",  // 用户输入
      identifyCode: "WebA"  // 系统验证码
    };
  },
  components: {
    Footer,
    Header,
    OtherLoginType,
    Sidentify
  },
  mounted() {
    // 获取是否记录了密码
    this.remember = Boolean(localStorage.getItem("remember"));
    if (this.remember === true) {
      this.username = crypto.Decrypt(localStorage.getItem("name") || "");
      this.password = crypto.Decrypt(localStorage.getItem("pwd") || "");
    }
    // 生成随机数
    this.identifyCode = this.getverifycode();
  },
  methods: {
    Login() {
      // 校验验证码
      if(this.vercode.toLowerCase() != this.identifyCode.toLowerCase()) {
        this.$message({
          message: "验证码输入错误！",
          type: "warning",
          center: true
        });
        return;
      }
      if (this.username == "" || this.password == "") {
        this.$message({
          message: "用户名或密码不能为空",
          type: "warning",
          center: true
        });
        return;
      }
      let that = this;
      this.$axios
        .post("/api/user", {
          code: this.username,
          password: this.password,
          name: "login"
        })
        .then(function(response) {
          if (response.status == "200" && response.data == "3") {
            that.rememberSecret(that.remember);
            // 保存登录状态
            that.$store.commit("login", {usercode: that.username});
            that.$router.push({ path: "/home" });
          } else {
            that.$message({
              message: "用户名或密码不正确！",
              type: "error",
              center: true
            });
          }
        });
    },
    rememberSecret(isremember) {
      // 记住用户名和密码
      let name = crypto.Encrypt(this.username);
      let pwd = crypto.Encrypt(this.password);
      localStorage.setItem("name", name);
      localStorage.setItem("pwd", pwd);
      localStorage.setItem("remember", isremember);
    },
    refreshcode() {
      // 刷新验证码
      this.identifyCode = this.getverifycode();
    },
    getverifycode() {
      const code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let ret = '';
      for(var i = 0; i < 4;i++) {
        ret += code[Math.floor(Math.random()*(0,36))];
      }
      return ret;
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

