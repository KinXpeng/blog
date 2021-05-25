<template>
  <div class="header-group">
    <el-col :span="8">
      <div class="header-title">倾倾倾风博客管理系统</div>
    </el-col>
    <el-col :span="8">
      <div class="header-navbar">
        <ul>
          <li class="active">首页</li>
          <li>写文章</li>
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
  .header-title{
    line-height:50px;
    text-align: center;
    font-size: 20px;
  }
  .header-navbar{
    ul{
      display: flex;
      justify-content: space-around;
      line-height: 50px;
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
