<template>
  <div class="layadmin-user-login layadmin-user-display-show">
    <div class="layadmin-user-login-main">
      <Header></Header>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div class="layui-form-item">
          <label
            class="layadmin-user-login-icon layui-icon layui-icon-cellphone"
            for="LAY-user-login-cellphone"
          ></label>
          <input
            type="text"
            name="cellphone"
            id="LAY-user-login-cellphone"
            lay-verify="phone"
            placeholder="手机"
            class="layui-input"
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
                id="LAY-user-login-vercode"
                lay-verify="required"
                placeholder="验证码"
                class="layui-input"
              />
            </div>
            <div class="layui-col-xs5">
              <div style="margin-left: 10px;">
                <button
                  type="button"
                  class="layui-btn layui-btn-primary layui-btn-fluid"
                  id="LAY-user-getsmscode"
                >获取验证码</button>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <label
            class="layadmin-user-login-icon layui-icon layui-icon-password"
            for="LAY-user-login-password"
          ></label>
          <input
            type="password"
            name="password"
            id="LAY-user-login-password"
            lay-verify="pass"
            placeholder="密码"
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
            id="LAY-user-login-repass"
            lay-verify="required"
            placeholder="确认密码"
            class="layui-input"
          />
        </div>
        <div class="layui-form-item">
          <label
            class="layadmin-user-login-icon layui-icon layui-icon-username"
            for="LAY-user-login-nickname"
          ></label>
          <input
            type="text"
            name="nickname"
            id="LAY-user-login-nickname"
            lay-verify="nickname"
            placeholder="昵称"
            class="layui-input"
          />
        </div>
        <div class="layui-form-item">
          <input type="checkbox" name="agreement" lay-skin="primary" title="同意用户协议" checked />
        </div>
        <div class="layui-form-item">
          <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="LAY-user-reg-submit">注 册</button>
        </div>
        <OtherLoginType type="Register" title="社交账号注册"></OtherLoginType>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/LoginHead.vue";
import OtherLoginType from "@/components/OtherLoginType.vue"
export default {
  components: {
    OtherLoginType,
    Header,
    Footer
  }
};
</script>

<style>
</style>