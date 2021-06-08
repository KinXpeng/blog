<template>
  <div class="home">
    <!-- header -->
    <el-row class="header">
      <header-com></header-com>
    </el-row>
    <!-- container -->
    <el-row class="container">
      <!-- left -->
      <el-col :span="5">
        <container-left></container-left>
      </el-col> 
      <!-- main -->
      <el-col class="main" :span="14">
        <router-view></router-view>
      </el-col>
      <!-- right -->
      <el-col :span="5">
        <container-right></container-right>
      </el-col>
    </el-row>
    <!-- footer -->
    <el-row class="footer" v-if="false">
      <el-col :span="8" class="location">首页 ><div class="grid-content"></div></el-col>
      <el-col :span="8">1.0.0</el-col>
      <el-col :span="8" class="author">Designed by 倾倾倾风</el-col>
    </el-row>
  </div>
</template>

<script>
import headerCom from '../components/header.vue';
import ContainerLeft from '../components/left/containerLeft.vue';
import ContainerRight from '../components/right/containerRight.vue';
export default {
  components: { 
    headerCom,
    ContainerLeft,
    ContainerRight 
  },
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
@import '@/assets/scss/dark.scss';
// header
.header{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  min-width: 800px;
  height:40px;
  z-index: 999;
  @include font_color("text-color");
  @include box_shadow("box_shadow");
  @include background_color("background_color");
}
// container
.container{
  padding-top:55px;
  width:92%;
  margin:0 auto;
  transition: .5s;
  .main{
    margin:0 auto;
  }
}
@media screen and (max-width: 1040px) {
  .container {
    width:98%;
  }
}
// footer
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
