<template>
  <li :class="{'layui-this': active}">
    <router-link :to="url" tag="span">
      <slot></slot>
    </router-link>
    <i class="layui-icon layui-unselect layui-tab-close">ဆ</i>
  </li>
</template>

<script>
export default {
  name: "TabItem",
  props: ["url"],
  data: function() {
    return {
      active: true
    };
  }
};
</script>

<style>
</style>