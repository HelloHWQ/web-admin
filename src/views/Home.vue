<template>
  <div class="layui-layout layui-layout-admin">
    <HomeHead></HomeHead>
    <HomeLeft></HomeLeft>
    <HomeTab></HomeTab>
    <div class="layui-body" id="LAY_app_body">
      <div class="layui-fluid">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHead from "@/components/HomeHead.vue";
import HomeLeft from "@/components/HomeLeft.vue";
import HomeTab from "@/components/HomeTab.vue";


export default {
  name: "home",
  data: function() {
    return {
      
    };
  },
  components: {
    HomeHead,
    HomeLeft,
    HomeTab
  }
};
</script>

<style scoped>
.laytable-cell-1-0-0 {
  width: 48px;
}
</style>
