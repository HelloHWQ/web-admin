<template>
  <div class="layui-side layui-side-menu">
    <div class="layui-side-scroll">
      <router-link tag="div" to="/home" class="layui-logo pointer">
        <span>Web-Admin</span>
      </router-link>

      <ul class="layui-nav layui-nav-tree">
        <li data-name="home" class="layui-nav-item" @mouseover="updateActiveState(index)" @mouseout="setState" v-for="(item,index) in leftMenuList" :key="item.name" :class="{'layui-nav-itemed': item.isclick }">
          <a href="javascript:;" @click="updateClickState(index)">
            <i class="layui-icon" :class="item.iconclass"></i>
            <cite>{{item.name}}</cite>
            <span class="layui-nav-more"></span>
            <span class="layui-nav-bar" style="height: 56px;" :class="{nodisplay: !item.isactive}"></span>
          </a>
          <dl class="layui-nav-child">
            <dd data-name="console" v-for="childitem in item.child" :key="childitem.title">
              <router-link :to="childitem.url" tag="a">{{childitem.title}}</router-link>
            </dd>
          </dl>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      leftMenuList: [
        {name: "主页", iconclass: "layui-icon-home", isactive: true, isclick:true, child: [{title: "控制台",url: "/home/console"}]},
        {name: "频道管理", iconclass: "layui-icon-app", isactive: false, isclick:false, child: [{title: "频道列表",url: ""}]},
        {name: "栏目管理", iconclass: "layui-icon-template", isactive: false, isclick:false, child: [{title: "栏目列表",url: ""}]},
        {name: "新闻管理", iconclass: "layui-icon-release", isactive: false, isclick:false, child: [{title: "新闻列表",url: ""}]},
        {name: "用户管理", iconclass: "layui-icon-user", isactive: false, isclick:false, child: [{title: "用户列表",url: ""}]},
        {name: "系统设置", iconclass: "layui-icon-set", isactive: false, isclick:false, child: [{title: "网站设置",url: ""},{title: "邮件服务",url: ""}]}
      ],
      isactive: true
    };
  },
  methods: {
    updateClickState(i) {
      this.leftMenuList.forEach((item) => {
        item.isclick = false;
        item.isactive = false;
      })
      this.leftMenuList[i].isactive = true;
      this.leftMenuList[i].isclick = true;
    },
    updateActiveState(i) {
      this.leftMenuList.forEach((item) => {
        item.isactive = false;
      })
      this.leftMenuList[i].isactive = true;
    },
    setState(){
      this.leftMenuList.forEach((item) => {
        if(item.isclick) {
          item.isactive = true;
        } else {
          item.isactive = false;
        }
      })
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.nodisplay {
  display: none;
}
</style>