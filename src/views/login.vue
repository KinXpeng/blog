<template>
  <div class="login">
    <div class="login_title">
      <el-image
        style="width: 140px; height: 60px"
        :src="require('../assets/images/logo.png')"
        fit="fit"
      ></el-image>
    </div>
    <div class="login_input">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username" label-width="70px">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input
            :type="flag ? 'text' : 'password'"
            v-model="loginForm.password"
            autocomplete="off"
          >
            <i
              slot="suffix"
              class="el-icon-view"
              :style="flag ? 'color:#3b99fc;' : ''"
              autocomplete="auto"
              @click="flag = !flag"
            />
          </el-input>
        </el-form-item>
        <el-form-item class="login_submit">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div v-loading.fullscreen.lock="loading"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      flag: false,
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("/api/user/login", this.loginForm)
            .then((res) => {
              this.loading = false;
              if (res.data.code === 0) {
                this.$message({
                  message: "登录成功",
                  showClose: true,
                  type: "success",
                });
                setTimeout(() => {
                  this.$store.state.username = this.loginForm.username;
                  this.$router.push({ path: "/" });
                }, 1500);
              } else {
                setTimeout(() => {
                  this.$message({
                    message: "账号或密码错误",
                    showClose: true,
                    type: "warning",
                  });
                }, 1000);
              }
            })
            .catch((err) => {
              setTimeout(()=>{
                this.loading = false;
                this.$message({
                  message: "服务器开小差了哦，请稍后再尝试登录。",
                  showClose: true,
                  type: "warning",
                });
              },1000)
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 400px;
  height: 300px;
  margin: 200px auto;
  .login_title {
    width: 140px;
    height: 60px;
    margin: 40px 0 30px 158px;
  }
  .login_input {
    .demo-ruleForm {
      padding: 0 20px;
    }
    .login_submit {
      /deep/.el-form-item__content {
        text-align: center;
      }
    }
  }
}
</style>
