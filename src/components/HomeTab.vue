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
        <li lay-id="home/console.html" lay-attr="home/console.html" class>
          <i class="layui-icon layui-icon-home"></i>
          <i class="layui-icon layui-unselect layui-tab-close">ဆ</i>
        </li>
        <TabItem v-for="item in tabList" :url="item.url" :key="item.tabname" :name="item.tabname">{{item.tabname}}</TabItem>
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
      tabList: [{
        tabname: '页签一',
        url: '#'
      }]
    }
  },
  components: {
    TabItem
  }
};
</script>

<style>
</style>