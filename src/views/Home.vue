<template>
  <div class="home">
    <!-- header -->
    <el-row class="header flex">
      <div class="header-sign" v-show="false">
        <i :class="expandFlag?'el-icon-close':'el-icon-menu'" @click="handleMenu"></i>
      </div>
      <header-com></header-com>
    </el-row>
    <div class="container">
      <!-- container -->
      <el-row :gutter="8" justify="center" type="flex">
        <!-- left -->
        <el-col :span="otherSpan">
          <container-left></container-left>
        </el-col> 
        <!-- main -->
        <el-col class="main" :span="mainSpan">
          <router-view></router-view>
        </el-col>
        <!-- right -->
        <el-col :span="otherSpan">
          <container-right></container-right>
        </el-col>
      </el-row>
    </div>
    <!-- footer -->
    <el-row class="footer">
      <copy-right></copy-right>
    </el-row>
  </div>
</template>

<script>
import CopyRight from '../components/copyRight.vue';
import headerCom from '../components/header.vue';
import ContainerLeft from '../components/left/containerLeft.vue';
import ContainerRight from '../components/right/containerRight.vue';
export default {
  components: { 
    headerCom,
    ContainerLeft,
    ContainerRight,
    CopyRight 
  },
  data() {
    return {
      mainSpan:14,
      otherSpan:5,
      expandFlag:false,
    };
  },
  watch:{
    $route(val){
      this.handleRouter(val.name);
    },
  },
  methods:{
    // 归档路由处理
    handleRouter(value){
      if(value == 'articleList'){ 
        this.mainSpan = 14;
        this.otherSpan = 5;
      }else{
        this.mainSpan = 18;
        this.otherSpan = 0;
      }
    },
    // 菜单按钮
    handleMenu(){
      this.expandFlag = !this.expandFlag;
    },
  },
  created(){
    this.handleRouter(this.$route.name);
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
  z-index: 1999;
  @include font_color("text-color");
  @include box_shadow("box_shadow");
  @include background_color("background_color7");
  .header-sign{
    width:4%;
    min-width: 50px;
    line-height:40px;
    text-align:center;
    &>i{
      color:#317adf;
      padding:6px;
      border-radius: 50%;
      cursor: pointer;
      &:hover{
        background-color: rgba(0,120,231,.1);
      }
    }
  }
}
// container
.container{
  position: relative;
  padding-top:48px;
  width:92%;
  margin:0 auto 20px;
  transition: .5s;
}
@media screen and (max-width: 1100px) {
  .container {
    width:98%;
  }
}
// footer
.footer{
  font-size: 14px;
  color:#666;
  padding-bottom: 10px;
}
</style>
