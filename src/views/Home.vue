<template>
  <div class="home">
    <!-- header -->
    <el-row class="header">
      <header-com></header-com>
    </el-row>
    <div class="container">
      <!-- container -->
      <el-row :gutter="8">
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
    </div>
    <!-- footer -->
    <el-row class="footer" v-if="true">
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
  @include background_color("background_color7");
}
// container
.container{
  padding-top:55px;
  width:92%;
  margin:0 auto 20px;
  transition: .5s;
  // .main{
  //   margin:0 auto;
  // }
}
@media screen and (max-width: 1040px) {
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
