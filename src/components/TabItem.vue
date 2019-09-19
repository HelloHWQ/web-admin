<template>
    <router-link :to="url" tag="li" :class="{'layui-this': active}" @click="OpenThisEvent($event)">
    <span>
      <slot></slot>
    </span>
    <i class="layui-icon layui-unselect layui-tab-close" @click.stop="CloseThis($event)">ဆ</i>
  </router-link>
</template>

<script>
export default {
  name: "TabItem",
  props: ["url","active"],
  data: function() {
    return {};
  },
  methods: {
    OpenThisEvent(e) {
      this.$emit('click',e);
    },
    CloseThis(e) {
      this.$emit('close',e);
    }
  }
};
</script>

<style>
</style>