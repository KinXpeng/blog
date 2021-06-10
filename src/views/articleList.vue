<template>
  <div class="article-list">
    <div class="article-header">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="first">
          <articles-info></articles-info>
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">文章</el-tab-pane>
        <el-tab-pane label="热门" name="third">热门</el-tab-pane>
        <el-tab-pane label="说说" name="fourth">说说</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import articlesInfo from '../components/articleList/articlesInfo.vue';
export default {
  components: { articlesInfo },
  data() {
    return {
      activeName:'first',
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
.article-list{
  padding-top: 1px;
  .el-tabs{
    /deep/ .el-tabs__header{
      padding:3px 15px 0;
      border-radius: 4px;
      margin:0 8px;
      @include background_color("background_color");
      .el-tabs__nav-wrap::after{
        background: none;
      }
      .is-top{
        .el-tabs__item{
          @include font_color("text-color");
        }
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
