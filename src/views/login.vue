<template>
  <div class="login-page">
    <div class="login" ref="login">
      <!-- login-title -->
      <div class="login_title">
        <el-image
          style="width: 140px; height: 60px"
          :src="require('../assets/images/logo.png')"
          fit="fit"
        ></el-image>
      </div>
      <!-- login-input -->
      <div class="login_input">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input type="text" size="small" prefix-icon="el-icon-user" ref="usernameInput" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="passFlag ? 'text' : 'password'"
              v-model="loginForm.password"
              autocomplete="off"
              size="small"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="submitForm('ruleForm')"
            >
              <i
                slot="suffix"
                class="el-icon-view"
                :style="passFlag ? 'color:#3b99fc;' : ''"
                autocomplete="auto"
                @click="passFlag = !passFlag"
              />
            </el-input>
          </el-form-item>
          <el-form-item class="login_submit">
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div v-loading.fullscreen.lock="loading"></div>
      </div>
      <!-- login-tips -->
      <div class="login-tips">
        <span class="tips-info">账号或密码输错？</span>
        <span class="tips-reset" @click="resetForm('ruleForm')">点击重置</span>
      </div>
      <!-- 背景 -->
      <div class="login-back">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import crypt from '../assets/js/encrypt'
export default {
  data() {
    return {
      loading: false,
      passFlag: false,
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
    // 登录按钮 密码验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 需要对密码进行加密处理
          let encryptPass = crypt.Encrypt(JSON.parse(JSON.stringify(this.loginForm.password)));
          let loginObj = {
            username:this.loginForm.username,
            password:encryptPass
          };
          this.loading = true;
          this.$axios
            .post("/blog-api/user/login", loginObj)
            .then((res) => {
              if (res.data.code === 0) {
                setTimeout(()=>{
                  this.loading = false;
                  this.$notify({
                    type:'success',
                    position:'top-right',
                    message:'登录成功'
                  })
                },500)
                sessionStorage.setItem('cookie',res.data.token); // 储存cookie
                setTimeout(() => {
                  this.$store.state.username = this.loginForm.username;
                  this.$router.push({ path: "/writeArticle" });
                }, 1500);
              } else {
                setTimeout(() => {
                  this.loading = false;
                  this.$notify({
                    type:'error',
                    position:'top-right',
                    message:'账号或密码错误'
                  })
                }, 1000);
              }
            })
            .catch((err) => {
              setTimeout(()=>{
                this.loading = false;
                this.$notify({
                  type:'error',
                  position:'top-right',
                  message:'服务器开小差了哦，请稍后再尝试登录。'
                })
              },1000)
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted(){
    
  },
};
</script>
<style lang="scss" scoped>
.login-page{
  position: fixed;
  top:0;
  left:0; 
  width:100%;
  height:100vh;
  opacity: 0.8;
  background: linear-gradient(to right, #cbb4d8 0%, #97db97 0%, #b465da 0%, #e4a7e0 33%, #d8779f 66%, #e980ac 100%);
  // background: -webkit-linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
  // background: linear-gradient(to bottom right,#50a3a2,#53e3a6);
  // background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);
}
// 登录
.login {
  width: 300px;
  height: 400px;
  margin: 15% auto 0;
  border-radius: 10px;
  padding-top:40px;
  background:#fff;
  // opacity: 0.5;
  .login_title {
    width: 140px;
    height: 60px;
    margin: 0 auto 20px;
  }
  // 登录框
  .login_input {
    .demo-ruleForm {
      padding: 0 20px;
      /deep/.el-input__inner{
        border:1px solid #aaa;
      }
      /deep/.el-input__prefix{
        i{
          color:#666;
        }
      }
    }
    // 提交按钮
    .login_submit {
      /deep/.el-form-item__content {
        text-align: center;
        .el-button{
          width:100%;
          font-weight: normal;
        }
        .el-button--primary{
          border:none;
          background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
        }
      }
    }
  }
  // 提示信息
  .login-tips{
    padding:0 20px;
    font-size: 12px;
    color:#ccc;
    text-align: center;
    transform: scale(0.8);
    // 点此重置样式
    .tips-reset{
      display: inline-block;
      padding-bottom: 2px;
      color:#e4a7e0;
      cursor: pointer;
      &:hover{
        color:#f07cac;
      }
    }
  }
  // 背景效果
  .login-back ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
  }
  .login-back ul li {
    list-style-type: none;
    display: block;
    position: absolute;
    bottom: -120px;
    width: 15px;
    height: 15px;
    z-index: -8;
    background-color: rgba(255, 255, 255, 0.15);
    animation: square 30s infinite;
    -webkit-animation: square 30s infinite;
  }
  .login-back ul li:nth-child(1) {
    left: 0;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .login-back ul li:nth-child(2) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 15s;
  }
  .login-back ul li:nth-child(3) {
    left: 20%;
    width: 25px;
    height: 25px;
    animation-duration: 18s;
    -moz-animation-duration: 18s;
    -o-animation-duration: 18s;
    -webkit-animation-duration: 18s;
  }
  .login-back ul li:nth-child(4) {
    width: 50px;
    height: 50px;
    left: 30%;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    animation-delay: 3s;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .login-back ul li:nth-child(5) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 13s;
    -moz-animation-duration: 13s;
    -o-animation-duration: 13s;
    -webkit-animation-duration: 13s;
  }
  .login-back ul li:nth-child(6) {
    width: 75px;
    height: 75px;
    left: 50%;
    -webkit-animation-delay: 8s;
    -moz-animation-delay: 8s;
    -o-animation-delay: 8s;
    animation-delay: 8s;
  }
  .login-back ul li:nth-child(7) {
    left: 60%;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 15s;
  }
  .login-back ul li:nth-child(8) {
    width: 90px;
    height: 90px;
    left: 70%;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    -o-animation-delay: 4s;
    animation-delay: 4s;
  }
  .login-back ul li:nth-child(9) {
    width: 100px;
    height: 100px;
    left: 80%;
    animation-duration: 35s;
    -moz-animation-duration: 35s;
    -o-animation-duration: 35s;
    -webkit-animation-duration: 35s;
  }
  .login-back ul li:nth-child(10) {
    width: 120px;
    height: 120px;
    left: 90%;
    -webkit-animation-delay: 6s;
    -moz-animation-delay: 6s;
    -o-animation-delay: 6s;
    animation-delay: 6s;
    animation-duration: 40s;
    -moz-animation-duration: 40s;
    -o-animation-duration: 40s;
    -webkit-animation-duration: 40s;
  }

  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      bottom: 800px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500);
    }
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      bottom: 800px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500);
    }
  }
}
</style>
