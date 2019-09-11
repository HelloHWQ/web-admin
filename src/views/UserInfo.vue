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
                <el-select v-model="CurrentUser.role" :disabled="true" placeholder="请选择">
                  <el-option
                    v-for="item in rolelist"
                    :key="item.roleValue"
                    :label="item.roleName"
                    :value="item.roleValue"
                  ></el-option>
                </el-select>
              </div>
              <div class="layui-form-mid layui-word-aux">当前角色不可更改为其它角色</div>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.code" :disabled="true"></el-input>
            </div>
            <div class="layui-form-mid layui-word-aux">不可修改。一般用于后台登入名</div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">昵称</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.name"></el-input>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">性别</label>
            <div class="layui-input-inline">
              <el-radio v-model="CurrentUser.sex" label="1">男</el-radio>
              <el-radio v-model="CurrentUser.sex" label="0">女</el-radio>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">头像</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入内容" v-model="CurrentUser.userImage" :disabled="true"></el-input>
            </div>
            <div class="layui-input-inline layui-btn-container" style="width: auto;">
              <el-button icon="el-icon-upload" @click="openDialog">上传头像</el-button>
              <input
                class="layui-upload-file"
                type="file"
                accept="undefined"
                name="file"
                ref="imagefile"
                @change="uploadImage($event)"
              />
              <el-button icon="el-icon-view" @click="showimage = !showimage">查看头像</el-button>
              <div v-show="showimage">
                <viewer :images="imgs">
                  <img v-for="src in imgs" :src="src.url" :key="src.url" />
                </viewer>
              </div>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">手机</label>
            <div class="layui-input-inline">
              <el-input placeholder="请输入手机号" v-model="CurrentUser.phoneNum"></el-input>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱</label>
            <div class="layui-input-inline">
              <el-input type="email" placeholder="请输入邮箱" v-model="CurrentUser.email"></el-input>
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
              <button class="layui-btn" @click="SubmitInfo">确认修改</button>
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
      rolelist: [],
      CurrentUser: null,
      imgs: [],
      showimage: false
    };
  },
  created() {
    this.CurrentUser = this.$store.state.CurrentUser;
    this.GetRoleList();
    this.GetCurrentUser(this.CurrentUser.usercode);
  },
  methods: {
    GetRoleList() {
      let that = this;
      this.$axios
        .get("/api/role")
        .then(response => {
          if (response.status == "200") {
            that.rolelist = response.data;
          }
        })
        .catch(error => {
          that.$message({
            message: "获取角色列表失败！" + error,
            type: "error",
            center: true
          });
        });
    },
    GetCurrentUser(code) {
      let that = this;
      if (code) {
        this.$axios
          .get("/api/user/" + code)
          .then(response => {
            if (response.status == "200") {
              that.CurrentUser = response.data;
              that.CurrentUser.role = that.CurrentUser.role.toString();
              that.CurrentUser.sex = that.CurrentUser.sex.toString();
              that.imgs.push({url: this.CurrentUser.userImage});
            }
          })
          .catch(error => {
            that.$message({
              message: "获取用户信息失败！" + error,
              type: "error",
              center: true
            });
          });
      }
    },
    openDialog() {
      this.$refs.imagefile.click();
    },
    uploadImage(event) {
      var that = this;
      var file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append("imgFile", file); //对应后台接收图片名
      this.$axios
        .post("/api/user/Photos", param)
        .then(response => {
          if (response.status == "200") {
            that.CurrentUser.userImage = response.data.webpath[0];
            that.imgs.push({ url: response.data.webpath[0] });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    SubmitInfo() {
      var that = this;
      this.$axios
        .put("/api/user/" + this.CurrentUser.code, this.CurrentUser)
        .then(response => {
          if (response.status == "200" && response.data == true) {
            localStorage.setItem('curuser',JSON.stringify(that.CurrentUser));
            that.$message({
              message: "用户信息修改成功！",
              type: "success",
              center: true
            });
          } else {
            that.$message({
              message: "用户信息提交失败！",
              type: "warning",
              center: true
            });
          }
        })
        .catch(error => {
          that.$message({
            message: "用户信息提交失败！" + error,
            type: "error",
            center: true
          });
        });
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-left: 15px;
}
</style>