<template>
  <div class="layadmin-pagetabs" id="LAY_app_tabs">
    <div class="layui-icon layadmin-tabs-control layui-icon-prev" layadmin-event="leftPage"></div>
    <div class="layui-icon layadmin-tabs-control layui-icon-next" layadmin-event="rightPage"></div>
    <div class="layui-icon layadmin-tabs-control layui-icon-down">
      <ul class="layui-nav layadmin-tabs-select" lay-filter="layadmin-pagetabs-nav">
        <li class="layui-nav-item" lay-unselect>
          <a href="javascript:;">
            <span class="layui-nav-more"></span>
          </a>
          <dl class="layui-nav-child layui-anim-fadein layui-anim layui-anim-upbit">
            <dd layadmin-event="closeThisTabs">
              <a href="javascript:;">关闭当前标签页</a>
            </dd>
            <dd layadmin-event="closeOtherTabs">
              <a href="javascript:;">关闭其它标签页</a>
            </dd>
            <dd layadmin-event="closeAllTabs">
              <a href="javascript:;">关闭全部标签页</a>
            </dd>
          </dl>
        </li>
        <span class="layui-nav-bar" style="left: 0px; top: 35px; width: 0px; opacity: 0;"></span>
      </ul>
    </div>
    <div class="layui-tab" lay-unauto lay-allowclose="true" lay-filter="layadmin-layout-tabs">
      <ul class="layui-tab-title" id="LAY_app_tabsheader">
        <router-link to="/home" tag="li" @click="CloseAll">
          <i class="layui-icon layui-icon-home"></i>
          <i class="layui-icon layui-unselect layui-tab-close">ဆ</i>
        </router-link>
        <TabItem v-for="(item,index) in this.$store.state.HeadTabList" @close="CloseThis(item.code,index)" @click="CloseAllWithOutThis(item.code)" :active="item.show" :url="item.url" :key="item.code" :name="item.title">{{item.title}}</TabItem>
      </ul>
    </div>
  </div>
</template>

<script>
import TabItem from "@/components/TabItem.vue";
export default {
  name: 'HomeTab',
  data: function() {
    return {
    }
  },
  components: {
    TabItem
  },
  methods: {
    CloseAllWithOutThis(code) {
      this.$store.commit('UpdateTab',code);
    },
    CloseThis(code,index) {
      // 将路径定位到前一个tab
      var url = "/home";
      if(index == 0) {
        if(this.$store.state.HeadTabList[index+1]) {
          url = this.$store.state.HeadTabList[index+1].url;
        }
      } else {
        url = this.$store.state.HeadTabList[index-1].url;
      }
      this.$router.push({ path: url});
      // 从tab中删除
      this.$store.commit('DelTab',code);
    },
    CloseAll() {
      this.$store.commit('UpdateTab','closeall');
    }
  }
};
</script>

<style>
</style>