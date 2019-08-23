<template>
  <div class="layui-trans layui-form-item layadmin-user-login-other">
    <label>{{title}}</label>
    <a href="javascript:;">
      <i class="layui-icon layui-icon-login-qq"></i>
    </a>
    <a href="javascript:;">
      <i class="layui-icon layui-icon-login-wechat"></i>
    </a>
    <a href="javascript:;">
      <i class="layui-icon layui-icon-login-weibo"></i>
    </a>
    <template v-if="type=='Register'">
      <router-link tag="a" to="/login" class="layadmin-user-jump-change layadmin-link layui-hide-xs">用已有帐号登入</router-link>
      <router-link tag="a" to="/login" class="layadmin-user-jump-change layadmin-link layui-hide-sm layui-show-xs-inline-block">登入</router-link>
    </template>
    <template v-else>
      <router-link tag="a" to="/register" class="layadmin-user-jump-change layadmin-link">注册帐号</router-link>
    </template>
    
  </div>
</template>

<script>
export default {
    props:['title','type']
};
</script>

<style>
</style>