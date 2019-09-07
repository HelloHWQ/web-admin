<template>
  <div class="layadmin-user-login layadmin-user-display-show">
    <div class="layadmin-user-login-main">
      <Header></Header>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div>
          <div class="layui-form-item">
            <label
              class="layadmin-user-login-icon layui-icon layui-icon-password"
              for="LAY-user-login-password"
            ></label>
            <input
              type="password"
              name="password"
              v-model="pwd1"
              lay-verify="pass"
              placeholder="新密码"
              class="layui-input"
            />
          </div>
          <div class="layui-form-item">
            <label
              class="layadmin-user-login-icon layui-icon layui-icon-password"
              for="LAY-user-login-repass"
            ></label>
            <input
              type="password"
              name="repass"
              v-model="pwd2"
              lay-verify="required"
              placeholder="确认密码"
              class="layui-input"
            />
          </div>
          <div class="layui-form-item">
            <button class="layui-btn layui-btn-fluid" @click="ChangePwd()">重置新密码</button>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/LoginHead.vue";
import crypto from "../assets/js/secret.js";
import { setTimeout } from 'timers';
export default {
  data: function() {
    return {
      pwd1: "",
      pwd2: ""
    };
  },
  components: {
    Footer,
    Header
  },
  methods: {
    ChangePwd() {
      if (this.pwd1 != "" && this.pwd2 != "" && this.pwd1 == this.pwd2) {
        var that = this;
        this.$axios
          .post("/api/user", {
            code: crypto.Decrypt(localStorage.getItem('name')),
            password: this.pwd2,
            name: "changepwd"
          })
          .then(function(response) {
            var retData = response.data;
            if (response.status == "200" && retData.code == 1) {
              that.pwd1 = '';
              that.pwd2 = '';
              that.$message({
                  message: retData.msg,
                  type: 'success',
                  center: true,
                  duration: 3000
              })
              setTimeout(() => {
                that.$store.commit("exit");
                that.$router.push({ name: "login" });
              },3000)
            } else {
              that.$message({
                message: retData.msg,
                type: "error",
                center: true
              });
            }
          });
      } else {
        let msg = "新密码和确认密码不一致！";
        if (this.pwd1 == "" || this.pwd2 == "") {
          msg = "新密码或确认密码不能为空！";
        }
        this.$message({
          message: msg,
          type: "warning"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>