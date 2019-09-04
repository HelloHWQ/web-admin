<template>
  <div class="layadmin-user-login layadmin-user-display-show">
    <div class="layadmin-user-login-main">
      <Header></Header>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div>
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
              placeholder="请输入注册时的手机号"
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
                  placeholder="图形验证码"
                  class="layui-input"
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
          <div class="layui-form-item">
            <div class="layui-row">
              <div class="layui-col-xs7">
                <label
                  class="layadmin-user-login-icon layui-icon layui-icon-vercode"
                  for="LAY-user-login-smscode"
                ></label>
                <input
                  type="text"
                  name="vercode"
                  id="LAY-user-login-smscode"
                  lay-verify="required"
                  placeholder="短信验证码"
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
            <button
              class="layui-btn layui-btn-fluid"
              lay-submit
              lay-filter="LAY-user-forget-submit"
            >找回密码</button>
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
export default {
  data: function() {
    return {
      
    };
  },
  components: {
    Footer,
    Header
  }
};
</script>

<style scoped>
</style>