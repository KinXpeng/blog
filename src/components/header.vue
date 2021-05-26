<template>
  <div class="header-group">
    <el-col :span="8">
      <div class="header-title">
        <img class="header-logo" src="../assets/images/logo.png" alt="">
        <p>倾倾倾风博客管理系统</p>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="header-navbar">
        <ul>
          <li class="active">首页</li>
          <li><i class="el-icon-edit"></i> 写文章</li>
          <li>333</li>
          <li>444</li>
        </ul>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="header-avator">
        <div class="header-img">
          <img src="../assets/images/head.jpg" alt="">
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.header-group{
  // 标题
  .header-title{
    display: flex;
    line-height:50px;
    text-align: center;
    font-size: 20px;
    .header-logo{
      height:40px;
      margin:5px;
    }
  }
  // 头部导航
  .header-navbar{
    ul{
      display: flex;
      justify-content: space-around;
      line-height: 50px;
      height:50px;
      li{
        flex:1;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: #3837a6;
        }
      }
      .active{
        background-color: #4f45b2;
        font-weight: bold;
      }
    }
  }
  // 头像
  .header-avator{
    .header-img{
      float:right;
      overflow: hidden;
      width:40px;
      height:40px;
      border:2px solid #ccc;
      border-radius: 50%;
      margin:5px 40px 0 0;
      cursor: pointer;
      &:hover{
        border-color:greenyellow;
      }
      img{
        width:100%;
        height:100%;
      }
    }
  }
}
</style>
