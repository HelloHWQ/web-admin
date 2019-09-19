<template>
  <div class="layui-header">
    <!-- 头部区域 -->
    <ul class="layui-nav layui-layout-left">
      <li class="layui-nav-item layadmin-flexible">
        <a href="javascript:;" title="侧边伸缩" v-on:click.prevent="ShowHiddenLeft()">
          <i class="layui-icon layui-icon-shrink-right"></i>
        </a>
      </li>
      <li class="layui-nav-item layui-hide-xs">
        <a :href="this.$store.state.weburl" target="_blank" title="前台">
          <i class="layui-icon layui-icon-website"></i>
        </a>
      </li>
      <li class="layui-nav-item">
        <a href="javascript:;" @click="reloadVue()" title="刷新">
          <i class="layui-icon layui-icon-refresh-3"></i>
        </a>
      </li>
      <li class="layui-nav-item layui-hide-xs">
        <input
          type="text"
          placeholder="搜索..."
          autocomplete="off"
          class="layui-input layui-input-search"
          @keyup.enter="Search()"
        />
      </li>
      <span class="layui-nav-bar" style="left: 38px; top: 48px; width: 0px; opacity: 0;"></span>
    </ul>
    <ul class="layui-nav layui-layout-right" lay-filter="layadmin-layout-right">
      <li class="layui-nav-item">
        <a lay-href="app/message/index.html" layadmin-event="message" lay-text="消息中心">
          <i class="layui-icon layui-icon-notice"></i>

          <!-- 如果有新消息，则显示小圆点 -->
          <span class="layui-badge-dot"></span>
        </a>
      </li>
      <!-- <li class="layui-nav-item layui-hide-xs">
        <a href="javascript:;" layadmin-event="theme">
          <i class="layui-icon layui-icon-theme"></i>
        </a>
      </li>-->
      <li class="layui-nav-item layui-hide-xs">
        <a href="javascript:;" title="便签" @click="OpenNote($event)">
          <i class="layui-icon layui-icon-note"></i>
        </a>
      </li>
      <li class="layui-nav-item layui-hide-xs">
        <a href="javascript:;" @click="toggleFullscreen()">
          <i class="layui-icon layui-icon-screen-full"></i>
        </a>
      </li>
      <li class="layui-nav-item layui-hide-xs">
        <a href="javascript:;"><img width="30px" :src="userimage" /></a>
      </li>
      <li class="layui-nav-item" @click="isopen = !isopen">
        <a href="javascript:;">
          <cite>{{usernmae}}</cite>
          <span class="layui-nav-more" :class="{'layui-nav-mored': isopen}"></span>
        </a>
        <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{'layui-show': isopen}">
          <dd>
            <router-link tag="a" to="/home/userinfo">基本资料</router-link>
          </dd>
          <dd>
            <router-link tag="a" to="/editpwd">修改密码</router-link>
          </dd>
          <hr />
          <dd style="text-align: center;">
            <a href="javascript:;" @click="LoginOut()">退出</a>
          </dd>
        </dl>
      </li>

      <li class="layui-nav-item layui-hide-xs">
        <a href="javascript:;" @click="openAbout = !openAbout">
          <i class="layui-icon layui-icon-more-vertical"></i>
        </a>
      </li>
      <li class="layui-nav-item layui-show-xs-inline-block layui-hide-sm">
        <a href="javascript:;" layadmin-event="more">
          <i class="layui-icon layui-icon-more-vertical"></i>
        </a>
      </li>
      <span class="layui-nav-bar" style="left: 28px; top: 48px; width: 0px; opacity: 0;"></span>
    </ul>
    <div
      v-show="shownote"
      :style="{top: top+'px',left: left+'px'}"
      class="layui-layer layui-layer-page layui-layer-admin layadmin-note layui-anim layui-anim-upbit"
      style="z-index: 19891018; width:300px;position:absolute;"
    >
      <div class="layui-layer-title" style="cursor: move;padding-left:20px">
        便签
        <span class="layui-layer-setwin" style="margin-left:220px;"></span>
        <i class="layui-icon" @click="NoteSave()">ဆ</i>
      </div>
      <div id="LAY_adminNote" class="layui-layer-content">
        <textarea style="background-color:#eee;" placeholder="内容" v-model="NoteContent"></textarea>
      </div>
    </div>


    <div v-show="openAbout" class="layui-layer-content" style="width:284px;position:fixed;top:48px;right:0;background-color:#fff;">
      <div class="layui-card-header">版本信息</div>
      <div class="layui-card-body layui-text layadmin-about">
        <p>当前版本：</p>
        <p>基于框架：</p>
        <p>关于作者：</p>
        <div class="layui-btn-container">
          <a
            href="#"
            target="_blank"
            class="layui-btn layui-btn-danger"
          >打赏作者</a>
          <a href="#" target="_blank" class="layui-btn">下载新版</a>
        </div>
      </div>
      <div class="layui-card-header">关于版权</div>
      <div class="layui-card-body layui-text layadmin-about">
        <blockquote class="layui-elem-quote" style="border: none;">
          Web-Admin 必须经
          <a href="#" target="_blank">作者</a>授权才可获得源文件使用权。不得恶意分享产品源代码、二次转售等，违者将承担相应的法律责任。
          <br />
          <br />详见：
          <a href="#" target="_blank">《许可声明》</a>
        </blockquote>
        <p>
          © 2019
          <a href="">HelloHWQ</a> 版权所有
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import crypto from "../assets/js/secret.js";

export default {
  name: "homehead",
  inject: ["reload"],
  data: function() {
    return {
      showLeft: false,
      NoteContent: "",
      shownote: false,
      top: 0,
      left: 0,
      isopen: false,
      openAbout: false,
      usernmae: '',
      userimage: '/avatar.png'
    };
  },
  methods: {
    ShowHiddenLeft() {
      // 伸缩侧边栏
      this.showLeft = !this.showLeft;
      this.$store.commit("setShowLeft", this.showLeft);
    },
    reloadVue() {
      // 刷新
      this.reload();
    },
    OpenNote(e) {
      // 打开便签
      // 获取鼠标的位置
      console.log(e);
      this.top = 23 + e.clientY;
      this.left = e.clientX - 300;
      this.shownote = !this.shownote;
    },
    NoteSave() {
      localStorage.setItem("notecontent", this.NoteContent);
      this.shownote = !this.shownote;
    },
    toggleFullscreen() {
      // 全屏
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    LoginOut() {
      // 退出登录
      this.$store.commit("exit");

      this.$router.push("/login");
    },
    Search() {
      // 全站搜索
      this.$message('搜索')
    }
  },
  mounted() {
    // 从local中获取便签内容
    this.NoteContent = localStorage.getItem("notecontent") || "";
    this.usernmae = crypto.Decrypt(localStorage.getItem("name") || "");
    var curuser = JSON.parse(localStorage.getItem('curuser') || '{}');
    if(curuser && curuser.userImage) {
      this.userimage = curuser.userImage;
    }
  }
};
</script>

<style>
</style>