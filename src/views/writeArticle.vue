<template>
  <div class="write-article">
    <!-- common-header -->
    <div class="header">
      <header-com></header-com>
    </div>
    <!-- article-edit -->
    <div class="article-edit" v-loading="loadingFlag">
      <div class="article-header">
        <el-tabs tab-position="left" v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="首页" name="first">
            <index-admin @load="loadIndex"></index-admin>
          </el-tab-pane>
          <el-tab-pane label="归档" name="second">
            <history-admin></history-admin>
          </el-tab-pane>
          <el-tab-pane label="创作" name="third">
            <create-admin></create-admin>
          </el-tab-pane>
          <el-tab-pane label="友情链接" name="fourth">
            <friendly-link-admin></friendly-link-admin>
          </el-tab-pane>
          <el-tab-pane label="关于我" name="fifth">
            <mine-admin></mine-admin>
          </el-tab-pane>
        </el-tabs>
      </div>
      
    </div>
  </div>
</template>

<script>
import CreateAdmin from '../components/blogAdmin/createAdmin.vue';
import FriendlyLinkAdmin from '../components/blogAdmin/friendlyLinkAdmin.vue';
import HistoryAdmin from '../components/blogAdmin/historyAdmin.vue';
import indexAdmin from "../components/blogAdmin/indexAdmin.vue"
import MineAdmin from '../components/blogAdmin/mineAdmin.vue';
import headerCom from "../components/header";
export default {
  components: {  headerCom,indexAdmin, HistoryAdmin, CreateAdmin, FriendlyLinkAdmin, MineAdmin },
  data() {
    return {
      activeName:'first',
      loadingFlag:false,
    };
  },
  methods: {
    // 标签切换时
    handleTabClick(tab){ // 点击tab的时候刷新数据
      console.log(tab);
      // if(tab.$children[0]){
      //   tab.$children[0].tags = '';
      // }
    },
    loadIndex(data){
      this.loadingFlag = data;
    },
  },
  created() {

  },
  mounted(){

  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dark.scss";
// header
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  height: 40px;
  z-index: 999;
  @include font_color("text-color");
  @include box_shadow("box_shadow");
  @include background_color("background_color7");
}
// article-edit
.article-edit {
  // padding-top:55px;
  width: 100%;
  margin: 45px auto 0;
  transition: 0.5s;
  .v-note-wrapper {
    border: none;
    @include background_color("background_color8");
    /deep/ .content-input-wrapper{
      @include background_color("background_color8");
      .auto-textarea-input{
        @include font_color("text-color");
        @include background_color("background_color8");
      }
    }
    /deep/ pre{
      .hljs{
        background: none;
      }
    }
    /deep/ .v-show-content{
      @include font_color("text-color");
    }
  }
  // el-tabs
  .el-tabs{
    /deep/ .el-tabs__header{
      padding:3px 15px;
      // border-radius: 4px;
      margin:8px 0 8px 8px;
      .el-tabs__item{
        // height:24px;
        // line-height:24px;
        // margin:10px 0;
        padding:0 10px 0 0;
        @include font_color("text-color");
      }
      @include background_color("background_color");
      .el-tabs__nav-wrap::after{
        background: none;
      }
      .is-top{
        .el-tabs__item{
          @include font_color("text-color");
        }
      }
      .el-tabs__active-bar{
        margin:0;
      }
    }
    .el-tab-pane{
      overflow: hidden;
      @include font_color("text-color");
      font-size: 14px;
      padding:8px;
      // height:300px;
    }
  }
}
</style>
<style scoped>
.el-tabs /deep/ .el-tabs__header{
  box-shadow: 0 0 4px rgb(26 26 26 / 10%);
}
</style>
