<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md12">
      <div class="layui-card">
        <div class="layui-card-header">编辑我的资料</div>
        <div class="layui-card-body">
          <div class="layui-form">
            <div class="layui-form-item">
              <label class="layui-form-label">我的角色</label>
              <div class="layui-input-inline">
                <el-select v-model="CurrentUser.role" placeholder="请选择">
                  <el-option
                    v-for="item in rolelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </div>
              <div class="layui-form-mid layui-word-aux">当前角色不可更改为其它角色</div>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.usercode" :disabled="true"></el-input>
            </div>
            <div class="layui-form-mid layui-word-aux">不可修改。一般用于后台登入名</div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.username"></el-input>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">性别</label>
            <div class="layui-input-inline">
              <el-radio v-model="CurrentUser.usersex" label="1">男</el-radio>
              <el-radio v-model="CurrentUser.usersex" label="0">女</el-radio>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">头像</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.userimage" :disabled="true"></el-input>
            </div>
            <div class="layui-input-inline layui-btn-container" style="width: auto;">
              <el-button icon="el-icon-upload">上传头像</el-button>
              <input class="layui-upload-file" type="file" accept="undefined" name="file" />
              <el-button icon="el-icon-view">查看头像</el-button>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">手机</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入手机号" v-model="CurrentUser.userphone"></el-input>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-inline">
              <el-input type="email" placeholder="请输入邮箱" v-model="CurrentUser.usermail"></el-input>
            </div>
          </div>
          <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">备注</label>
            <div class="layui-input-block">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                v-model="CurrentUser.usernote"
                maxlength="30"
                show-word-limit
              ></el-input>
            </div>
          </div>
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn">确认修改</button>
              <button type="reset" class="layui-btn layui-btn-primary">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {
      rolelist: [
        {
          label: "超级管理员",
          value: 1,
          disabled: true
        },
        {
          label: "系统管理员",
          value: 2,
          disabled: false
        },
        {
          label: "审核员",
          value: 3,
          disabled: false
        },
        {
          label: "编辑员",
          value: 4,
          disabled: false
        }
      ],
      CurrentUser: null
    };
  },
  created() {
    this.CurrentUser = this.$store.state.CurrentUser;
  }
};
</script>

<style scoped>
.el-button {
  margin-left: 15px;
}
</style>