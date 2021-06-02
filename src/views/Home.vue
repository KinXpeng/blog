<template>
  <div class="home">
    <!-- 头部导航栏 -->
    <el-row class="header">
      <header-com></header-com>
    </el-row>
    <!-- 中间内容 -->
    <el-row>
      <router-view></router-view>
    </el-row>
    <el-row class="footer" v-if="false">
      <el-col :span="8" class="location">首页 ><div class="grid-content"></div></el-col>
      <el-col :span="8">1.0.0</el-col>
      <el-col :span="8" class="author">Designed by 倾倾倾风</el-col>
    </el-row>
  </div>
</template>

<script>
import headerCom from '../components/header'
export default {
  components: { headerCom },
  data() {
    return {
    };
  },
  methods:{
  },
  created(){
  },
};
</script>

<style lang='scss' scoped>
.header{
  width:100%;
  height:40px;
  // color:#fff;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 #ddd;
}
.footer{
  position: fixed;
  left:0;
  bottom:0;
  width:100%;
  height:35px;
  line-height: 35px;
  background-color: #fff;
  border-top:1px solid #eee;
  font-size: 14px;
  color:#666;
  text-indent: 20px;
  .author{
    text-align: right;
    padding-right: 40px;
    // &:hover{
    //   color:deepskyblue;
    // }
  }
}
</style>
